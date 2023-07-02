const router =  require("express").Router();

const middleware = require("../middleware/auth");
const upload = require('../controllers/uploads');

const userController = require("../controllers/userController");
const bidController = require("../controllers/bidController");
const paymentController = require("../controllers/paymentController");
const applicationController = require("../controllers/applicationController");
const adminController = require("../controllers/adminController");

// account management

router.post("/signup", userController.signup);

router.post("/login", userController.login);

router.get("/profile", middleware.userAuth, userController.getProfile);

router.get("/user/:file", userController.getFile);

router.post("/create/org", middleware.userAuth, userController.createOrganization);

router.get("/notifications", middleware.userAuth, userController.getNotifications);

router.put("/suspend", middleware.adminAuth, userController.suspendUser);

router.put("/account/verify", middleware.userAuth, userController.verifyAccount);

router.put("/account/verifyForgotPassword", middleware.userAuth, userController.verifyAccountToForgetPassword);

router.put("/change/password", middleware.userAuth, userController.changePassword);

//router.put("/forgot/password" , userController.forgotPassword);

router.post("/forgot/password" , userController.forgot);

router.post("/account/reset-password" , userController.resetPassword);

router.get("/my_requests", middleware.userAuth, userController.getRequests);

// bid management

router.get("/bids", bidController.browseBids);

router.get("/bidsOrg", bidController.browseBidsOrg);

router.get("/bids/closed", middleware.userAuth, bidController.getClosedBids);

router.get("/bids/ongoing", middleware.userAuth, bidController.getOngoingBids);

router.get("/bids/upcoming", middleware.userAuth, bidController.getUpcomingBids);

router.get("/mybids", middleware.userAuth, bidController.getMyBids);

router.get("/bid/:id", middleware.userAuth ,bidController.getBidById);

router.post("/create/bid", [upload.single("files"), middleware.userAuth], bidController.createBid);

router.put("/bid/edit", [upload.single("files"),middleware.userAuth], bidController.editBid);

router.delete("/bid/remove", middleware.adminAuth, bidController.removeBid);

// application routes 

router.put("/accept/application", middleware.userAuth, applicationController.acceptApplication);

router.post("/apply", [upload.single("files"), middleware.userAuth], applicationController.apply);

router.get("/winner", middleware.userAuth, applicationController.getWinner);

// admin controller

router.post("/addAdmin", adminController.addAdmin);

router.post("/admin/login", adminController.login);

router.get("/users", middleware.adminAuth, adminController.getAllUsers);

router.get("/requests", middleware.adminAuth, adminController.getWithdrawalRequests);

router.put("/approve/request/:id", middleware.adminAuth, adminController.acceptWithdrawalRequest);

// payment management

router.post("/deposit", middleware.userAuth, paymentController.deposit);

router.get("/payments", middleware.userAuth, paymentController.getPayments);

router.put("/verify/:id", middleware.userAuth, paymentController.verifyPayment);

router.post("/withdraw", middleware.userAuth, paymentController.requestWithdraw);


module.exports = router;
