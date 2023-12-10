const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const userAuthentication = require("../middleware/auth");

router.get("/isPremiumUser", userAuthentication, userController.isPremiumUser);
router.post("/signUp", userController.addUser);
router.get("/getAllUsers", userController.getAllUsers);
// router.post("/login", userController.login);

router.post("/logIn", userController.logIn);

module.exports = router;
