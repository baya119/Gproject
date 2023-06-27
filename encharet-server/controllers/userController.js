const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const axios = require("axios");
require("dotenv").config();

const prisma = new PrismaClient();
const userControllers = {};
const CHAPA_URL = process.env.CHAPA_URL;
const CHAPA_AUTH = process.env.CHAPA_AUTH;

userControllers.signup = async (req, res) => {
  const { fname, lname, email, phonenumber, password } = req.body;

  if (!fname || !lname || !email || !phonenumber || !password) {
    return res.status(401).send({
      status: 401,
      message: "Please enter all fields!!",
    });
  }

  try {
    const n = await prisma.user.count({
      where: {
        email,
      },
    });
    let isFound = n > 0 ? true : false;

    if (isFound) {
      return res.status(401).send({
        status: 401,
        message: "User already exists!!",
      });
    } else {
      let salt = await bcrypt.genSalt(10);
      let pwd = await bcrypt.hash(password, salt);
      const newUser = await prisma.user.create({
        data: {
          fname,
          lname,
          email,
          password: pwd,
          balance: 0,
          phonenumber,
          registered_at: new Date(),
        },
        include: {
          Organizations: true,
          Applications: true,
          Payments: true,
          Notifications: true,
        },
      });

      const token = jwt.sign({ newUser }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });

      res.status(200).json({
        token,
        user: newUser,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      status: 500,
      message: error.meta || "Internal error check the server log!!",
    });
  }
};

userControllers.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(401).send({
      status: 401,
      message: "Please enter all fields!!",
    });
  }

  try {
    const user = await prisma.user.findMany({
      where: {
        email,
      },
      include: {
        Organizations: true,
        Applications: true,
        Payments: true,
        Notifications: true,
      },
    });

    if (user[0]) {
      const isMatch = bcrypt.compareSync(password, user[0].password);
      if (isMatch) {
        const token = jwt.sign(user[0], process.env.JWT_SECRET, {
          expiresIn: "1d",
        });

        res.status(200).json({ token: token, user: user[0] });
      } else {
        return res.status(401).send({
          status: 401,
          message: "Invalid credentials!!",
        });
      }
    } else {
      return res.status(401).send({
        status: 401,
        message: "User doesn't exist!!",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      status: 500,
      message: error.meta || "Internal error check the server log!!",
    });
  }
};

userControllers.getProfile = async (req, res) => {
  const { id } = req.user;

  try {
    const user = await prisma.user.findMany({
      where: {
        id
      },
      include: {
        Organizations: true,
        Applications: true,
        Bids: true,
        Payments: true,
        Notifications: true
      }
    })

    res.json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      status: 500,
      message: error.meta || "Internal error check the server log!!",
    });
  }
};

userControllers.createOrganization = async (req, res) => {
  const { id } = req.user;

  const { name, tin_number, type, location } = req.body;

  if (!name || !tin_number || !type || !location) {
    return res.status(401).send({
      status: 401,
      message: "Please enter all fields!!",
    });
  }

  try {
    const n = await prisma.organization.count({
      where: {
        OR: [{ name }, { tin_number }],
      },
    });

    let isFound = n > 0 ? true : false;
    if (isFound) {
      return res.status(401).send({
        status: 401,
        message: "Organization already exists!!",
      });
    } else {
      const newOrg = await prisma.organization.create({
        data: {
          name,
          tin_number,
          type,
          location,
          user_id: id,
          registered_at: new Date(),
        },
      });

      res.json(newOrg);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      status: 500,
      message: error.meta || "Internal error check the server log!!",
    });
  }
};

userControllers.createBid = async (req, res) => {
  const files  = req.files;
  const { id } = req.user;
  const { cpo_amount, title, description, fee, deadline } = req.body;

  if (!files) {
    return res.status(401).send({
      status: 401,
      message: "Please upload supporting documents!!",
    });
  }

  if (!cpo_amount || !title || !description || !fee || !deadline) {
    return res.status(401).send({
      status: 401,
      message: "Please enter all fields!!",
    });
  }

  let date = Date.now();

  try {
    const org = await prisma.organization.findMany({
      where: {
        user_id: id,
      },
    });

    if (org[0]) {
      const bid = await prisma.bid.create({
        data: {
          user_id: id,
          cpo_amount: parseFloat(cpo_amount),
          created_at: new Date(),
          title,
          description,
          fee: parseFloat(fee),
          status: "PENDING",
          deadline: new Date(deadline)
        },
        include: {
          BidFiles: true,
        },
      });

      await prisma.bidFiles.create({
        data: {
          bid_id: bid.id,
          file_url: "/user/" + files
        },
      });

      res.json(bid);
    } else {
      return res.status(500).send({
        status: 401,
        message: "Please create organization first!!",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      status: 500,
      message: error.meta || "Internal error check the server log!!",
    });
  }
};

userControllers.browseBids = async (req, res) => {
  const cpo_max = req.query.cpo_max;
  const cpo_min = req.query.cpo_min;
  const max = req.query.max;
  const min = req.query.min;
  const orderBy = req.query.orderBy;
  const title = req.query.title;

  try {
    const bids = await prisma.bid.findMany({
      where: {
        title: {
          contains: title || undefined,
        },
        cpo_amount: {
          gte: parseFloat(cpo_min) || undefined,
          lte: parseFloat(cpo_max) || undefined,
        },
        fee: {
          gte: parseFloat(min) || undefined,
          lte: parseFloat(max) || undefined,
        },
      },
      orderBy: {
        created_at: orderBy || undefined,
      },
      include: {
        BidFiles: true,
      },
    });

    res.json(bids);
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      status: 500,
      message: error.meta || "Internal error check the server log!!",
    });
  }
};

userControllers.getBids = async (req, res) => {
  const { id } = req.user;
  const cpo_max = req.query.cpo_max;
  const cpo_min = req.query.cpo_min;
  const max = req.query.max;
  const min = req.query.min;
  const orderBy = req.query.orderBy;
  const title = req.query.title;
  const status = req.query.status;

  try {
    const bids = await prisma.bid.findMany({
      where: {
        user_id: id,
        title: {
          contains: title || undefined,
        },
        status: status || undefined,
        cpo_amount: {
          gte: parseFloat(cpo_min) || undefined,
          lte: parseFloat(cpo_max) || undefined,
        },
        fee: {
          gte: parseFloat(min) || undefined,
          lte: parseFloat(max) || undefined,
        },
      },
      orderBy: {
        created_at: orderBy || undefined,
      },
      include: {
        BidFiles: true,
        Applications: true,
        Payments: true,
      },
    });

    res.json(bids);
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      status: 500,
      message: error.meta || "Internal error check the server log!!",
    });
  }
};

userControllers.apply = async (req, res) => {
  const files = req.files;
  const { id } = req.user;
  const bid_id = parseInt(req.query.bid_id);

  // if (!files) {
  //   return res.status(401).send({
  //     status: 401,
  //     message: "Please upload supporting documents!!",
  //   });
  // }

  if (!bid_id) {
    return res.status(401).send({
      status: 401,
      message: "Please enter all fields!!",
    });
  }

  try {
    const bid = await prisma.bid.findMany({
      where: {
        id: bid_id
      }
    })

    const user = await prisma.user.findMany({
      where:{
        id
      }
    })

    if(bid[0].cpo_amount > user.balance){
      return res.status(401).send({
        status: 401,
        message: "Insufficient balance, please deposit enough amount of money in your acount"
      });
    }

    const application = await prisma.application.create({
      data: {
        file_url:
          "/user/" +
           files,
        user_id: id,
        bid_id,
        created_at: new Date(),
      },
    });

    res.json(application);
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      status: 500,
      message: error.meta || "Internal error check the server log!!",
    });
  }
};

userControllers.getFile = async (req, res) => {
  const file = req.params.file;
  res.sendFile(__dirname + `/uploads/${file}`);
};

userControllers.acceptApplication = async (req, res) => {
  const application_id = parseInt(req.query.id);
  const bid_id = parseInt(req.query.bid_id);

  try {
    const bid = await prisma.bid.update({
      where: {
        id: bid_id,
      },
      data: {
        status: "COMPLETED",
      },
    });

    const app = await prisma.application.findMany({
      where: { id: application_id },
    });
    const user = app[0].user_id;

    await prisma.application.update({
      where: {
        id: application_id
      },
      data: {
        status: "ACCEPTED"
      }
    })
    await prisma.notification.create({
      data: {
        user_id: user,
        message: `Congragulations we have accepted your application.`,
        created_at: new Date(),
      },
    });

    res.json(bid);
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      status: 500,
      message: error.meta || "Internal error check the server log!!",
    });
  }
};

userControllers.deposit = async (req, res) => {
  const { fname, lname, email } = req.user;
  const id = parseInt(req.query.id);

  const amount = parseFloat(req.query.amount);

  if (!amount) {
    return res.status(401).send({
      status: 401,
      message: "Please enter all fields!!",
    });
  }

  try {
    const payment = await prisma.payment.create({
      data: {
        user_id: id,
        amount,
        paid_at: new Date(),
        status: "PENDING",
      },
    });

    await prisma.user.update({
      where: {
        id
      },
      data: {
        balance: {
          increment: amount
        }
      }
    })

    const config = {
      headers: {
        Authorization: `Bearer ${CHAPA_AUTH}`,
      },
    };

    const CALLBACK_URL = "http://localhost:4400/api/verify-payment/";
    const RETURN_URL = "http://localhost:5173/sucess";

    const TEXT_REF = "tx-myecommerce12345-" + Date.now();

    const data = {
      amount: amount.toString(),
      currency: "ETB",
      email: email,
      first_name: fname,
      last_name: lname,
      tx_ref: TEXT_REF,
      callback_url: CALLBACK_URL + TEXT_REF,
      return_url: RETURN_URL,
    };

    await axios
      .post(CHAPA_URL, data, config)
      .then((response) => {
        res.json({
          url: response.data.data.checkout_url,
          ...payment,
        });
      })
      .catch((err) => console.log(err));
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      status: 500,
      message: error.meta || "Internal error check the server log!!",
    });
  }
};

userControllers.verifyPayment = async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    await prisma.payment
      .update({
        where: {
          id,
        },
        data: {
          status: "COMPLETED",
        },
      })
      .then((result) => {
        res.json(result);
      });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      status: 500,
      message: error.meta || "Internal error check the server log!!",
    });
  }
};

userControllers.getBidById = async (req, res) => {
  const { id } = req.user;
  const bid_id = parseInt(req.params.id);

  console.log(bid_id)
  if (!bid_id) {
    return res.status(401).send({
      status: 401,
      message: "Please enter all fields!!",
    });
  }

  try {

    const user = await prisma.user.findMany({
      where: {
        id
      }
    })

    const balance = user[0].balance;

    const payment = await prisma.payment.findMany({
      where: {
        user_id: id,
        bid_id,
      },
    });

    const bid = await prisma.bid.findMany({
      where: {
        id: bid_id,
      },
      include: {
        Applications: true,
        BidFiles: true
      }
    });

    if (payment.length == 0) {
     if(balance < bid[0].fee){
      return res.status(401).send({
        status: 401,
        message: "Insufficient balance, please deposit enough amount of money in your acount"});
     }else{
      await prisma.user.update({
        where: {
          id,
        },
        data: {
          balance: {
            decrement: bid[0].fee,
          },
        },
      });

      await prisma.payment.create({
        data: {
          user_id: id,
          bid_id,
          amount: bid[0].fee,
          paid_at: new Date(),
          status: "COMPLETED"
        }
      })
     }

     res.json(bid);
    }else if(id === bid[0].user_id){
      res.json(bid); 
    }else {
      res.json(bid); 
      // return res.status(401).send({
      //   status: 401,
      //   message: "You already applied to the bid please wait for response from the organization!!",
      // });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      status: 500,
      message: error.meta || "Internal error check the server log!!",
    });
  }
};


userControllers.getPayments = async(req, res) => {
  const { id } = req.user;
  try {
    const payments = await prisma.payment.findMany({
      where: {
        user_id: id
      },
      orderBy: {
        paid_at: "desc"
      }
    })

    res.json(payments);
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      status: 500,
      message: error.meta || "Internal error check the server log!!",
    });
  }
}

userControllers.getNotifications = async(req, res) => {
  const { id } = req.user;

  try {
    const notifications = await prisma.notification.findMany({
      where: {
        user_id: id
      }
    })

    res.json(notifications)
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      status: 500,
      message: error.meta || "Internal error check the server log!!",
    });
  }
}

userControllers.getWinner = async(req, res) => {
  const bid_id = parseInt(req.query.bid_id);

  if(!bid_id){
    return res.status(401).send({
      status: 401,
      message: "Please enter all fields!!",
    });
  }

  try {
    const application = await prisma.application.findMany({
      where: {
        bid_id,
        status: "ACCEPTED"
      }
    })

    if(application[0]){
      const user = await prisma.user.findMany({
        where: {
          id: application[0].user_id
        }
      });
  
      res.json({
        message: `User ${user[0].fname} ${user[0].lname} has won the bidding.`
      })
    }else{
      res.json()
    }
  } catch (error) {
     console.log(error);
    return res.status(500).send({
      status: 500,
      message: error.meta || "Internal error check the server log!!",
    });
  }
}

module.exports = userControllers;
