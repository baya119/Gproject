const router =  require("express").Router();

const userMiddleware = require("../middleware/auth");
const userController = require("../controllers/userController");
const upload = require('../controllers/uploads');

router.post("/signup", userController.signup);

router.post("/login", userController.login);

router.get("/profile", userMiddleware.auth, userController.getProfile);

router.get("/bids", userController.browseBids);

router.get("/bid/:id", userMiddleware.auth ,userController.getBidById);

router.get("/org/bids", userMiddleware.auth, userController.getBids);

router.post("/deposit", userMiddleware.auth, userController.deposit);

router.put("/verify/:id", userMiddleware.auth, userController.verifyPayment);

router.get("/payments", userMiddleware.auth, userController.getPayments);

router.get("/user/:file", userController.getFile);

router.post("/create/org", userMiddleware.auth, userController.createOrganization);

router.post("/create/bid", [upload.single("files"), userMiddleware.auth], userController.createBid);

router.put("/accept/application", userMiddleware.auth, userController.acceptApplication);

router.post("/apply", [upload.single("files"), userMiddleware.auth], userController.apply);

router.get("/notifications", userMiddleware.auth, userController.getNotifications);

router.get("/winner", userMiddleware.auth, userController.getWinner);

module.exports = router;
