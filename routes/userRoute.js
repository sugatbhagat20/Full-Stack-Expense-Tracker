const express = require("express");
const router = express.Router();
const path = require("path");
const userController = require("../controllers/userController");
const userAuthentication = require("../middleware/auth");

router.get("/isPremiumUser", userAuthentication, userController.isPremiumUser);
router.post("/signUp", userController.addUser);
router.get("/getAllUsers", userController.getAllUsers);
router.post("/logIn", userController.logIn);
router.get("/download", userAuthentication, userController.downloadExpenses);

// Route to serve login.html
// router.get("/login", (req, res) => {
//   res.sendFile(path.join(__dirname, "../public/views/html/login.html"));
// });

// Route to serve signup.html
// router.get("/signup", (req, res) => {
//   res.sendFile(path.join(__dirname, "../public/views/html/signup.html"));
// });

module.exports = router;
