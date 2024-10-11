const Expense = require("../model/expenseModel");
const { Op } = require("sequelize"); // Import Op for Sequelize operators

exports.dailyReports = async (req, res, next) => {
  try {
    const date = req.body.date;
    console.log(date);
    const expenses = await Expense.findAll({
      where: { createdAt: date, userId: req.user.id },
    });
    return res.send(expenses);
  } catch (error) {
    console.log(error);
  }
};

exports.monthlyReports = async (req, res, next) => {
  try {
    const month = req.body.month;

    // Ensure the query matches '%-MM-%' where MM is the month.
    const expenses = await Expense.findAll({
      where: {
        createdAt: {
          [Op.like]: `%-${month}-%`, // Use Op.like and proper string interpolation
        },
        userId: req.user.id,
      },
      raw: true,
    });

    return res.send(expenses);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ error: "An error occurred while fetching monthly reports" });
  }
};
