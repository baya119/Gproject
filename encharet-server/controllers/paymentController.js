const axios = require("axios");
const { PrismaClient } = require("@prisma/client");

const paymentControllers = {};
const prisma = new PrismaClient();
const CHAPA_URL = process.env.CHAPA_URL;
const CHAPA_AUTH = process.env.CHAPA_AUTH;

paymentControllers.deposit = async (req, res) => {
  const { id, fname, lname, email } = req.user.newUser
    ? req.user.newUser
    : req.user;
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

    const config = {
      headers: {
        Authorization: `Bearer ${CHAPA_AUTH}`,
      },
    };

    const CALLBACK_URL = "http://localhost:4400/api/verify-payment/";
    const RETURN_URL = "http://localhost:5173/success";

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

paymentControllers.verifyPayment = async (req, res) => {
  const { id } = req.user.newUser ? req.user.newUser : req.user;
  const pid = parseInt(req.params.id);
  console.log(pid);
  try {
    // get payment info
    const payment = await prisma.payment.findMany({
      where: {
        id: pid,
      },
    });

    if (payment[0].status === "PENDING") {
      // update user data
      await prisma.user.update({
        where: {
          id,
        },
        data: {
          active_balance: {
            increment: payment[0].amount,
          },
        },
      });

      // update payment data
      await prisma.payment
        .update({
          where: {
            id: pid,
          },
          data: {
            status: "COMPLETED",
          },
        })
        .then((result) => {
          res.json(result);
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

paymentControllers.getPayments = async (req, res) => {
  const { id } = req.user;
  try {
    const payments = await prisma.payment.findMany({
      where: {
        user_id: id,
      },
      orderBy: {
        paid_at: "desc",
      },
    });

    res.json(payments);
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      status: 500,
      message: error.meta || "Internal error check the server log!!",
    });
  }
};

paymentControllers.requestWithdraw = async (req, res) => {
  const { id, fname, lname, phonenumber } = req.user
    .newUser
    ? req.user.newUser
    : req.user;
  const { bank_account, bank, amount } = req.body;

  if (!bank_account || !bank || !amount) {
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

    const no_of_request = await prisma.withdrawalRequest.count({
      where: {
        user_id: id,
        status: "PENDING",
      },
    });

    let exists = no_of_request > 0 ? true : false;

    if (!exists) {
      if (user[0].status === "ACTIVE") {
        if (user[0].active_balance >= amount) {
          const WithdrawalRequest = await prisma.withdrawalRequest.create({
            data: {
              user_id: id,
              fname,
              lname,
              phonenumber,
              bank_account,
              bank,
              amount: parseFloat(amount),
              created_at: new Date(),
            },
          });

          res.json(WithdrawalRequest);
        } else {
          return res.status(401).send({
            status: 401,
            message: "Insufficient balance to withdraw!!",
          });
        }
      } else {
        return res.status(401).send({
          status: 401,
          message: "Please verify your account first!!",
        });
      }
    } else {
      return res.status(401).send({
        status: 401,
        message:
          "You already have another pending withdrawal request, please wait for response!!",
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

module.exports = paymentControllers;
