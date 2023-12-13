const path = require("path");
const User = require("../model/userModel");
const ResetPassword = require("../model/resetPasswordModel");
const bcrypt = require("bcryptjs");
//const Sib = require("sib-api-v3-sdk");
const SibApiV3Sdk = require("@getbrevo/brevo");
const dotenv = require("dotenv");
dotenv.config();
const { v4: uuidv4 } = require("uuid");
const sequelize = require("../utils/database");
const saltRounds = 10;

const hashPassword = async (password) => {
  return await bcrypt.hash(password, saltRounds);
};

exports.sendMail = async (req, res, next) => {
  try {
    const email = req.body.email;
    const requestId = uuidv4();

    const recepientEmail = await User.findOne({ where: { email: email } });

    if (!recepientEmail) {
      return res
        .status(404)
        .json({ message: "Please provide the registered email!" });
    }

    const resetRequest = await ResetPassword.create({
      id: requestId,
      isActive: true,
      userId: recepientEmail.dataValues.id,
    });
    let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
    let apiKey = apiInstance.authentications["apiKey"];
    apiKey.apiKey = process.env.API_KEY;
    let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
    sendSmtpEmail.subject = "Expense Tracker Reset Password";
    sendSmtpEmail.htmlContent = `<html><body><h1>Hi! We got the request from you for reset the password. Here is the link below >>></h1><a href="http://localhost:4000/password/resetPasswordPage/${requestId}"> Click Here</a></body></html>`;
    sendSmtpEmail.sender = { name: "Sugat", email: "sugat.bhagat20@gmail.com" };
    sendSmtpEmail.to = [
      {
        email: req.body.email,
      },
    ];

    apiInstance.sendTransacEmail(sendSmtpEmail).then(
      function (data) {
        console.log(
          "API called successfully. Returned data: " + JSON.stringify(data)
        );
      },
      function (error) {
        console.error(error);
      }
    );
  } catch (error) {
    console.log(error);
    return res.status(409).json({ message: "failed reseting password" });
  }
};

// exports.sendMail = async (req, res, next) => {
//   try {
//     let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
//     let apiKey = apiInstance.authentications["apiKey"];
//     apiKey.apiKey = process.env.API_KEY;
//     let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
//     sendSmtpEmail.subject = "Expense Tracker Reset Password";
//     sendSmtpEmail.htmlContent =
//       "<html><body><h1>Hi! We got the request from you for reset the password. Here is the link below >>></h1></body></html>";
//     sendSmtpEmail.sender = { name: "Sugat", email: "sugat.bhagat20@gmail.com" };
//     sendSmtpEmail.to = [
//       {
//         email: req.body.email,
//       },
//     ];

//     apiInstance.sendTransacEmail(sendSmtpEmail).then(
//       function (data) {
//         console.log(
//           "API called successfully. Returned data: " + JSON.stringify(data)
//         );
//       },
//       function (error) {
//         console.error(error);
//       }
//     );
//   } catch (error) {
//     console.log(error);
//     return res.status(409).json({ message: "failed reseting password" });
//   }
// };

exports.resetPasswordPage = async (req, res, next) => {
  try {
    res
      .status(200)
      .sendFile(
        path.join(
          __dirname,
          "../",
          "public",
          "views",
          "html",
          "resetPassword.html"
        )
      );
  } catch (error) {
    console.log(error);
  }
};

exports.updatePassword = async (req, res, next) => {
  const requestId = req.params.requestId;
  console.log(requestId);
  const password = req.body.password;
  console.log(password);
};
