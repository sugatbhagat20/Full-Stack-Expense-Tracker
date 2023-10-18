const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");

router.post("/signUp", userController.addUser);

module.exports = router;
