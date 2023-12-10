const users = require("../model/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Sib = require("sib-api-v3-sdk");
require("dotenv").config();
const sequelize = require("../utils/database");
function generateAccessToken(id, email) {
  return jwt.sign(
    { userId: id, email: email },
    "kjhsgdfiuiew889kbasgdfskjabsdfjlabsbdljhsd"
  );
}

exports.isPremiumUser = async (req, res, next) => {
  try {
    if (req.user.isPremiumUser) {
      return res.json({ isPremiumUser: true });
    }
  } catch (error) {
    console.log(error);
  }
};

exports.addUser = async (req, res, next) => {
  console.log(req.body);
  try {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    bcrypt.hash(password, 10, async (err, hash) => {
      await users
        .create({
          name: name,
          email: email,
          password: hash,
        })
        .then((result) => {
          console.log("User Added");
          res.status(201).json(result);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  } catch (error) {
    console.log(error);
  }
};

exports.logIn = async (req, res, next) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    users
      .findOne({ where: { email: email } })
      .then((user) => {
        if (user) {
          bcrypt.compare(password, user.password, (err, result) => {
            if (result === true) {
              return res.status(200).json({
                success: true,
                message: "Login Successful!",
                token: generateAccessToken(user.id, user.email),
              });
            } else {
              return res
                .status(401)
                .json({ success: false, message: "Password Incorrect!" });
            }
          });
        } else {
          return res
            .status(404)
            .json({ success: false, message: "User doesn't Exists!" });
        }
      })
      .catch(res);
    {
      console.log(res);
    }
  } catch (error) {
    console.log(error);
  }
};

exports.getAllUsers = async (req, res, next) => {
  try {
    users
      .findAll({
        attributes: [
          [sequelize.col("name"), "name"],
          [sequelize.col("totalExpenses"), "totalExpenses"],
        ],
        order: [[sequelize.col("totalExpenses"), "DESC"]],
      })
      .then((users) => {
        const result = users.map((user) => ({
          name: user.getDataValue("name"),
          totalExpenses: user.getDataValue("totalExpenses"),
        }));
        res.send(JSON.stringify(result));
      })
      .catch((err) => {
        console.error(err);
      });
  } catch (error) {
    console.log(error);
  }
};
