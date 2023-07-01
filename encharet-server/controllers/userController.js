const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require('nodemailer');
require("dotenv").config();

const prisma = new PrismaClient();
const userControllers = {};
const app_pwd = process.env.APP_PASSWORD;

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'hexsnwhite@gmail.com',
    pass: app_pwd
  }
});


const genRanHex = size => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');

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
          active_balance: 0,
          cpo_holded: 0,
          total_fee: 0,
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

      const date = new Date();

      date.setMinutes(date.getMinutes() + 30);
      const verification = await prisma.verification.create({
        data: {
          user_id: newUser.id,
          code: genRanHex(6),
          expires_at: date
        }
      })

      // sending email with emailjs

      const mailOptions = {
        from: 'hexsnwhite@gmail.com',
        to: newUser.email,
        subject: 'Verification code',
        text: `Dear ${newUser.fname} ${newUser.lname} to verify account please enter this code ${verification.code}`
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
       console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
          // do something useful
        }
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
  const { id } = req.user.newUser ? req.user.newUser : req.user;

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

userControllers.getFile = async (req, res) => {
  const file = req.params.file;
  res.sendFile(__dirname + `/uploads/${file}`);
};

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

userControllers.changePassword = async(req, res) => {
  const { id, password } = req.user.newUser ? req.user.newUser : req.user;
  const { oldPassword, newPassword } = req.body; 

  if(!oldPassword || !newPassword){
    return res.status(401).send({
      status: 401,
      message: "Please enter all fields!!",
    });
  }

  try {
    const isMatch = bcrypt.compareSync(oldPassword, password);
    if(isMatch){
      let salt = await bcrypt.genSalt(10);
      let pwd = await bcrypt.hash(newPassword, salt);

      await prisma.user.update({
        where: {
          id
        },
        data: {
          password: pwd
        }
      })

      res.json("Done!!")
    }else {
      return res.status(401).send({
        status: 401,
        message: "Invalid old password!!",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      status: 500,
      message: error.meta || "Internal error check the server log!!",
    });
  }
}

userControllers.forgotPassword = async(req, res) => {
  const { email, newPassword } = req.body;

  if(!email || !newPassword){
    return res.status(401).send({
      status: 401,
      message: "Please enter all fields!!",
    });
  }

  try {
    const user = await prisma.user.findMany({
      where: {
        email
      }
    })

    if(user[0]){
      let salt = await bcrypt.genSalt(10);
      let pwd = await bcrypt.hash(newPassword, salt);

      await prisma.user.update({
        where: {
          id: user[0].id
        },
        data: {
          password: pwd
        }
      })

      res.json("Done!!")
    }else {
      return res.status(401).send({
        status: 401,
        message: "User not found!!",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      status: 500,
      message: error.meta || "Internal error check the server log!!",
    });   
  }
}

userControllers.verifyAccount = async(req, res) => {
  const { id } = req.user.newUser ? req.user.newUser : req.user;
  const { code } = req.body;

  console.log(id, code);
  if(!code){
    return res.status(401).send({
      status: 401,
      message: "Please enter all fields!!",
    });
  }

  try {
    const verification = await prisma.verification.findMany({
      where: {
        user_id: id,
        code,
        expires_at: {
          gt: new Date()
        }
      }
    })

    if(verification[0]){
      const user = await prisma.user.update({
        where: {
          id
        },
        data: {
          status: "ACTIVE"
        }
      })

      res.json(user)
    }else {
      return res.status(401).send({
        status: 401,
        message: "Please verify again!!",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      status: 500,
      message: error.meta || "Internal error check the server log!!",
    });  
  }
}

userControllers.suspendUser = async(req, res) => {
  const { role } = req.admin;
  const id = parseInt(req.query.id);

  try {
    if(role){
      await prisma.user.update({
        where: {
          id
        },
        data: {
          status: "SUSPENDED"
        }
      })
  
      res.json({message: "Done!!"})
    }else {
      return res.status(401).send({
        status: 401,
        message: "Unauthorized user!!",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      status: 500,
      message: error.meta || "Internal error check the server log!!",
    });    
  }
}

userControllers.getRequests = async(req, res) => {

  console.log("called");
  const { id } = req.user;

  try {
    const requests = await prisma.withdrawalRequest.findMany({
      where: {
        user_id: id
      }
    })

    res.json(requests)
  } catch (error) {
     console.log(error);
    return res.status(500).send({
      status: 500,
      message: error.meta || "Internal error check the server log!!",
    });  
  }
}

module.exports = userControllers;
