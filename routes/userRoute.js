const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/signUp", userController.addUser);

// router.post("/login", userController.login);

router.post("/logIn", userController.logIn);

module.exports = router;
