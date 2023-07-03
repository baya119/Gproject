const {PrismaClient} = require("@prisma/client");
const jwt = require("jsonwebtoken");

const bidControllers = {};
const prisma = new PrismaClient();

bidControllers.createBid = async(req, res) => {
    const files = req.files;
    const {id, status} = req.user.newUser
        ? req.user.newUser
        : req.user;
    const {
        cpo_amount,
        title,
        description,
        fee,
        deadline,
        tag
    } = req.body;

    if (!files) {
        return res
            .status(401)
            .send({status: 401, message: "Please upload supporting documents!!"});
    }

    if (!cpo_amount || !title || !description || !fee || !deadline || !tag) {
        return res
            .status(401)
            .send({status: 401, message: "Please enter all fields!!"});
    }

    try {
        const org = await prisma
            .organization
            .findMany({
                where: {
                    user_id: id
                }
            });

        if (status === "ACTIVE") {
            if (org[0] && org[0].status == "ACTIVE") {
                const bid = await prisma
                    .bid
                    .create({
                        data: {
                            user_id: id,
                            cpo_amount: parseFloat(cpo_amount),
                            created_at: new Date(),
                            title,
                            description,
                            fee: parseFloat(fee),
                            status: "PENDING",
                            tag,
                            deadline: new Date(deadline)
                        },
                        include: {
                            BidFiles: true
                        }
                    });

                await prisma
                    .bidFiles
                    .create({
                        data: {
                            bid_id: bid.id,
                            file_url: "/user/" + files
                        }
                    });

                    return res
                    .status(201)
                    .send({status: 201, message: "Your bid has been successfully accepted."});
            } 
            else if(org[0].status != "ACTIVE"){
                return res
                    .status(500)
                    .send({status: 401, message: "Please wait for the administrator to activate the organization.!!"});
            }
            else {
                return res
                    .status(500)
                    .send({status: 401, message: "Please create organization first!!"});
            }
        } else if (status === "SUSPENDED") {
            return res
                .status(500)
                .send({status: 401, message: "Your account has been suspended!!"});
        } else {
            return res
                .status(500)
                .send({status: 401, message: "Please verify your account first!!"});
        }
    } catch (error) {
        
        return res
            .status(500)
            .send({
                status: 500,
                message: error.meta || "Internal error check the server log!!"
            });
    }
};

bidControllers.getOngoingBids = async(req, res) => {
    const max = req.query.max;
    const min = req.query.min;
    const tag = req.query.tag;
    const date = req.query.date;
    const title = req.query.title;
    const status = req.query.status;
    const token = req.headers.authorization;
    const {id} = req.user.newUser
        ? req.user.newUser
        : req.user;

    try {
        const applications = await prisma
            .application
            .findMany({
                where: {
                    user_id: id,
                    status: "PENDING"
                }
            });
        

        const bidsPromises = applications.map(async(application) => {
            const bid = await prisma
                .bid
                .findMany({
                    where: {
                        id: application.bid_id,
                        title: {
                            contains: title || undefined
                        },
                        fee: {
                            gte: parseFloat(min) || undefined,
                            lte: parseFloat(max) || undefined
                        },
                        tag,
                        
                    },
                    orderBy: {
                      created_at: date === "latest"
                          ? "desc"
                          : "asc" || undefined
                  },
                  include: {
                      BidFiles: true
                  }
                });
            return bid;
        });

        const bids = await Promise.all(bidsPromises);
        

        
        res.json(bids);
    } catch (error) {
        
        return res
            .status(500)
            .send({
                status: 500,
                message: error.meta || "Internal error check the server log!!"
            });
    }
};

bidControllers.browseBids = async(req, res) => {
    const max = req.query.max;
    const min = req.query.min;
    const tag = req.query.tag;
    const date = req.query.date;
    const title = req.query.title;
    const status = req.query.status

    try {
        const bids = await prisma
            .bid
            .findMany({
                where: {
                    title: {
                        contains: title || undefined
                    },
                    fee: {
                        gte: parseFloat(min) || undefined,
                        lte: parseFloat(max) || undefined
                    },
                    tag,
                    status
                },
                orderBy: {
                    created_at: date === "latest"
                        ? "desc"
                        : "asc" || undefined
                },
                include: {
                    BidFiles: true
                }
            });

        res.json(bids);
    } catch (error) {
        
        return res
            .status(500)
            .send({
                status: 500,
                message: error.meta || "Internal error check the server log!!"
            });
    }
};

bidControllers.browseBidsOrg = async (req, res) => {
  try {
    const org = await prisma.organization.findMany({where:{}});

    // const bids = await prisma
    // .bid
    // .findMany({
    //     where: {},

    // });
    // bids.forEach(bid => {
    //   const org = await prisma.organization.findMany({
    //     where: {
    //       user_id : {
    //         equals: bid.user_id
    //       } 
    //     }
    //   })
    // });

    res.json(org);
  } catch (error) {
    
    return res.status(500).send({
      status: 500,
      message: error.meta || "Internal error check the server log!!",
    });
  }
};

bidControllers.getClosedBids = async(req, res) => {
    const {id} = req.user.newUser
        ? req.user.newUser
        : req.user;

    try {
        const closedBids = await prisma
            .bid
            .findMany({
                where: {
                    status: "COMPLETED"
                }
            });

        res.json(closedBids);
    } catch (error) {
        
        return res
            .status(500)
            .send({
                status: 500,
                message: error.meta || "Internal error check the server log!!"
            });
    }
};

bidControllers.getUpcomingBids = async(req, res) => {
    const {id} = req.user.newUser
        ? req.user.newUser
        : req.user;

    try {
        const upcomingBids = await prisma
            .bid
            .findMany({
                where: {
                    status: "PENDING"
                },
                orderBy: {
                    created_at: "desc"
                }
            });

        res.json(upcomingBids);
    } catch (error) {
        
        return res
            .status(500)
            .send({
                status: 500,
                message: error.meta || "Internal error check the server log!!"
            });
    }
};

bidControllers.getMyBids = async(req, res) => {
    const {id} = req.user.newUser
        ? req.user.newUser
        : req.user;

    try {
        const myBids = await prisma
            .bid
            .findMany({
                where: {
                    user_id: id
                }
            });

        res.json(myBids);
    } catch (error) {
        
        return res
            .status(500)
            .send({
                status: 500,
                message: error.meta || "Internal error check the server log!!"
            });
    }
};

bidControllers.getBidById = async(req, res) => {
    const {id, status} = req.user.newUser
        ? req.user.newUser
        : req.user;
    const bid_id = parseInt(req.params.id);

    // form validation
    if (!bid_id) {
        return res
            .status(401)
            .send({status: 401, message: "Please enter all fields!!"});
    }

    try {
        if (status === "ACTIVE") {

            // get current user
            const user = await prisma
                .user
                .findMany({where: {
                        id
                    }});

            // get current user balance
            const balance = user[0].active_balance;

            // check for previous applications
            const application = await prisma
                .application
                .findMany({
                    where: {
                        user_id: id,
                        bid_id
                    }
                });

            // get bid info
            const bid = await prisma
                .bid
                .findMany({
                    where: {
                        id: bid_id
                    },
                    include: {
                        Applications: true,
                        BidFiles: true
                    }
                });

            // check if user already applied or created the post
            if (application.length == 0 && id !== bid[0].user_id) {
                // check if user has sufficient balance
                const payment = await prisma
                    .payment
                    .findMany({
                        where: {
                            user_id: id,
                            bid_id
                        }
                    })

                // check if user already paid the fee
                if (payment[0]) {
                    return res.json(bid);
                } else {
                    if (balance < bid[0].fee) {
                        return res
                            .status(401)
                            .send({status: 401, message: "Insufficient balance, please deposit enough amount of money in your acount"});
                    } else {
                        if (bid[0].status === "PENDING") {
                            // update user balance
                            await prisma
                                .user
                                .update({
                                    where: {
                                        id
                                    },
                                    data: {
                                        active_balance: {
                                            decrement: bid[0].fee
                                        }
                                    }
                                });

                            // update bid owner balance
                            await prisma
                                .user
                                .update({
                                    where: {
                                        id: bid[0].user_id
                                    },
                                    data: {
                                        active_balance: {
                                            increment: bid[0].fee * 0.85
                                        },
                                        total_fee: {
                                            increment: bid[0].fee * 0.85
                                        }
                                    }
                                });

                            // update bid info
                            await prisma
                                .bid
                                .update({
                                    where: {
                                        id: bid_id
                                    },
                                    data: {
                                        total_fee: {
                                            increment: bid[0].fee
                                        }
                                    }
                                });

                            // create payment data
                            await prisma
                                .payment
                                .create({
                                    data: {
                                        user_id: id,
                                        bid_id,
                                        amount: bid[0].fee,
                                        paid_at: new Date(),
                                        status: "COMPLETED"
                                    }
                                });
                        }
                    }
                }
                return res.json(bid);
            } else if (id === bid[0].user_id) {
                res.json(bid);
            } else {
                if (bid[0].status === "PENDING") {
                    return res
                        .status(401)
                        .send({status: 401, message: "You already applied to the bid please wait for response from the organization!!"});
                } else {
                    return res.json(bid);
                }
            }
        } else if (status === "SUSPENDED") {
            return res
                .status(500)
                .send({status: 401, message: "Your account has been suspended!!"});
        } else {
            return res
                .status(500)
                .send({status: 401, message: "Please verify your account first!!"});
        }
    } catch (error) {
        
        return res
            .status(500)
            .send({
                status: 500,
                message: error.meta || "Internal error check the server log!!"
            });
    }
};

bidControllers.editBid = async(req, res) => {
    const files = req.files;
    const {
        cpo_amount,
        title,
        description,
        fee,
        deadline,
        tag
    } = req.body;
    const bid_id = parseInt(req.query.bid_id);

    if (!files) {
        return res
            .status(401)
            .send({status: 401, message: "Please upload supporting documents!!"});
    }

    if (!bid_id || !cpo_amount || !title || !description || !fee || !deadline || !tag) {
        return res
            .status(401)
            .send({status: 401, message: "Please enter all fields!!"});
    }

    try {
        const bid = await prisma
            .bid
            .update({
                where: {
                    id: bid_id
                },
                data: {
                    title,
                    cpo_amount: parseFloat(cpo_amount),
                    description,
                    deadline: new Date(deadline),
                    fee: parseFloat(fee),
                    tag
                },
                include: {
                    BidFiles: true
                }
            })

        let bidfile_id = bid.BidFiles[0].id;

        await prisma
            .bidFiles
            .update({
                where: {
                    id: bidfile_id
                },
                data: {
                    file_url: "/uploads/" + files
                }
            })

        res.json(bid)
    } catch (error) {
        
        return res
            .status(500)
            .send({
                status: 500,
                message: error.meta || "Internal error check the server log!!"
            });
    }
};

bidControllers.removeBid = async(req, res) => {
    const {role} = req.admin;
    const id = parseInt(req.query.id);

    try {
        if (role) {
            await prisma
                .bid
                .delete({where: {
                        id
                    }});

            res.json({message: "Done!!"})
        } else {
            return res
                .status(401)
                .send({status: 401, message: "Unauthorized user!!"});
        }
    } catch (error) {
        
        return res
            .status(500)
            .send({
                status: 500,
                message: error.meta || "Internal error check the server log!!"
            });
    }
};

module.exports = bidControllers;