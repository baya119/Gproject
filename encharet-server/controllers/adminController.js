const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const adminControllers = {};
const prisma = new PrismaClient();

adminControllers.addAdmin = async (req, res) => {
  const { fname, lname, email, phonenumber, password } = req.body;

  let salt = await bcrypt.genSalt(10);
  let pwd = await bcrypt.hash(password, salt);
  const admin = await prisma.admin.create({
    data: {
      fname,
      lname,
      email,
      phonenumber,
      password: pwd,
    },
  });
  console.log(admin);
  res.json(admin);
};

adminControllers.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(401).send({
      status: 401,
      message: "Please enter all fields!!",
    });
  }

  try {
    const admin = await prisma.admin.findMany({
      where: {
        email,
      },
    });

    if (admin[0]) {
      const isMatch = bcrypt.compareSync(password, admin[0].password);
      if (isMatch) {
        const token = jwt.sign(admin[0], process.env.JWT_SECRET, {
          expiresIn: "1d",
        });

        res.status(200).json({ token: token, admin: admin[0] });
      } else {
        return res.status(401).send({
          status: 401,
          message: "Invalid credentials!!",
        });
      }
    } else {
      return res.status(401).send({
        status: 401,
        message: "admin doesn't exist!!",
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

adminControllers.getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      where: {},
    });

    res.json(users);
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      status: 500,
      message: error.meta || "Internal error check the server log!!",
    });
  }
};

adminControllers.getWithdrawalRequests = async (req, res) => {
  const { role } = req.admin;

  try {
    if (role) {
      const requests = await prisma.withdrawalRequest.findMany({
        where: {},
      });

      res.json(requests);
    } else {
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
};

adminControllers.acceptWithdrawalRequest = async (req, res) => {
  const { role } = req.admin;
  const id = parseInt(req.params.id);

  try {
    if (role) {
      const request = await prisma.withdrawalRequest.findMany({
        where: {
          id
        }
      })

      if(request[0].status === "PENDING"){
        await prisma.user.update({
          where: {
            id: request[0].user_id
          },
          data: {
            active_balance: {
              decrement: request[0].amount
            }
          }
        })
      }

      await prisma.withdrawalRequest
        .update({
          where: {
            id,
          },
          data: {
            status: "ACCEPTED",
          },
        })
        .then((response) => {
          res.json(response);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
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
};

module.exports = adminControllers;
