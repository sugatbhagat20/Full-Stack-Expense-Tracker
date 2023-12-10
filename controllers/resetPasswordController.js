const path = require("path");
const User = require("../model/userModel");
//const ResetPassword = require("../model/resetPasswordModel");
const bcrypt = require("bcryptjs");
//const Sib = require("sib-api-v3-sdk");
const Brevo = require("@getbrevo/brevo");
const dotenv = require("dotenv");
dotenv.config();
//const saltRounds = 10;

// const hashPassword = async (password) => {
//   return await bcrypt.hash(password, saltRounds);
// };

exports.sendMail = async (req, res, next) => {
  try {
    console.log(Brevo.ApiClient);
    const client = Brevo.ApiClient.instance;
    const apiKey = client.authentications["api-key"];
    apiKey.apiKey = process.env.API_KEY;
    const transEmailApi = new Brevo.TransactionalEmailsApi();

    var sendSmtpEmail = new Brevo.SendSmtpEmail();
    const sender = {
      email: "sugat.bhagat20@gmail.com",
      name: "Sugat",
    };
    const receiver = [
      {
        email: req.body.email,
      },
    ];
    const emailResponse = await transEmailApi.sendTransacEmail({
      sender,
      To: receiver,
      subject: "Expense Tracker Reset Password",
      textContent: "Link Below",
      htmlContent: `<h3>Hi! We got the request from you for reset the password. Here is the link below >>></h3>`,
    });
    return res.json(emailResponse);
  } catch (error) {
    console.log(error);
    return res.status(409).json({ message: "failed reseting password" });
  }
};

// exports.resetPasswordPage = async (req, res, next) => {
//   try {
//     res
//       .status(200)
//       .sendFile(
//         path.join(__dirname, "../", "public", "views", "resetPassword.html")
//       );
//   } catch (error) {
//     console.log(error);
//   }
// };

// exports.updatePassword = async (req, res, next) => {
//   try {
//     const requestId = req.headers.referer.split("/");
//     const password = req.body.password;
//     const checkResetRequest = await ResetPassword.findAll({
//       where: { id: requestId[requestId.length - 1], isActive: true },
//     });
//     if (checkResetRequest[0]) {
//       const userId = checkResetRequest[0].dataValues.userId;
//       const result = await ResetPassword.update(
//         { isActive: false },
//         { where: { id: requestId } }
//       );
//       const newPassword = await hashPassword(password);
//       const user = await User.update(
//         { password: newPassword },
//         { where: { id: userId } }
//       );
//       return res
//         .status(200)
//         .json({ message: "Successfully changed password!" });
//     } else {
//       return res
//         .status(409)
//         .json({ message: "Link is already Used Once, Request for new Link!" });
//     }
//   } catch (err) {
//     console.log(err);
//     return res.status(409).json({ message: "Failed to change password!" });
//   }
// };
