const jwt = require("jsonwebtoken");
const users = require("../model/userModel");
// const dotenv = require("dotenv");
// dotenv.config();
require("dotenv").config();
const authenticate = (req, res, next) => {
  try {
    const token = req.header("Authorization");
    const user = jwt.verify(token, process.env.TOKEN);
    users.findByPk(user.userId).then((user) => {
      req.user = user;
      next();
    });
  } catch (err) {
    console.log(err);
    return res.status(401).json({ success: false });
  }
};

module.exports = authenticate;
