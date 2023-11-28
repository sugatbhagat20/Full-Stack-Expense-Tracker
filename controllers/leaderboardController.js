const User = require("../model/userModel");
const Expense = require("../model/expenseModel");
const sequelize = require("../utils/database");

// exports.getLeaderboardPage = (req, res, next) => {
//   res.sendFile(
//     path.join(__dirname, "../", "public", "views", "leaderboard.html")
//   );
// };

// exports.getLeaderboard = (req, res, next) => {
//   Expense.findAll({
//     attributes: [
//       [sequelize.fn("sum", sequelize.col("amount")), "totalExpense"],
//       [sequelize.col("user.name"), "name"],
//     ],
//     group: ["userId"],
//     include: [
//       {
//         model: User,
//         attributes: [],
//       },
//     ],
//     order: [[sequelize.fn("sum", sequelize.col("amount")), "DESC"]],
//   })
//     .then((expenses) => {
//       const result = expenses.map((expense) => ({
//         name: expense.getDataValue("name"),
//         amount: expense.getDataValue("totalExpense"),
//       }));
//       res.send(JSON.stringify(result));
//     })
//     .catch((err) => console.log(err));
// };
