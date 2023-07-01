const { PrismaClient } = require("@prisma/client");

const applicationController = {};
const prisma = new PrismaClient();

applicationController.apply = async (req, res) => {
  const files = req.files;
  const { id } = req.user.newUser ? req.user.newUser : req.user;
  const bid_id = parseInt(req.query.bid_id);

  if (!files) {
    return res.status(401).send({
      status: 401,
      message: "Please upload supporting documents!!",
    });
  }

  if (!bid_id) {
    return res.status(401).send({
      status: 401,
      message: "Please enter all fields!!",
    });
  }

  try {
    const bid = await prisma.bid.findMany({
      where: {
        id: bid_id,
      },
    });

    const user = await prisma.user.findMany({
      where: {
        id,
      },
    });

    if (bid[0].cpo_amount > user[0].active_balance) {
      return res.status(401).send({
        status: 401,
        message:
          "Insufficient balance, please deposit enough amount of money in your acount",
      });
    }

    await prisma.user.update({
      where: {
        id
      },
      data: {
        active_balance: {
          decrement: bid[0].cpo_amount
        },
        cpo_holded: {
          increment: bid[0].cpo_amount
        }
      }
    })

    const application = await prisma.application.create({
      data: {
        file_url: "/user/" + files,
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

applicationController.acceptApplication = async (req, res) => {
  const application_id = parseInt(req.query.id);
  const bid_id = parseInt(req.query.bid_id);

  try {

    // updating bid info
    const bid = await prisma.bid.update({
      where: {
        id: bid_id,
      },
      data: {
        status: "COMPLETED",
      },
      include: {
        Applications: true
      }
    });

    // getting application info
    const app = await prisma.application.update({
      where: {
        id: application_id,
      },
      data: {
        status: "ACCEPTED",
      },
    });

    // updating balance of the winner
    const user = await prisma.user.update({
      where: {
        id: app.user_id
      },
      data: {
        cpo_holded: {
          decrement: bid.cpo_amount
        },       
      }
    });

    // updating balance of the bid owner
    await prisma.user.update({
      where: {
        id: bid.user_id
      },
      data: {
        active_balance: {
          increment: (0.85 * bid.cpo_amount)
        }
      }
    })

    // updating balance info of each applicants
    bid.Applications.map(async ap => {
      if(ap.id !== app.id){
        await prisma.user.update({
          where: {
            id: ap.user_id
          },
          data: {
            cpo_holded: {
              decrement: bid.cpo_amount
            },
            active_balance: {
              increment: bid.cpo_amount
            }
          }
        })
      }
    })

    // creating notification
    await prisma.notification.create({
      data: {
        user_id: user.id,
        message: `Congragulations we have accepted your application.`,
        created_at: new Date(),
      },
    });

    // updating bid total fee
    await prisma.bid.update({
      where: {
        id: bid_id
      },
      data: {
        total_fee: {
          increment: bid.cpo_amount
        }
      }
    })

    res.json(bid);
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      status: 500,
      message: error.meta || "Internal error check the server log!!",
    });
  }
};

applicationController.getWinner = async(req, res) => {
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


module.exports = applicationController;
