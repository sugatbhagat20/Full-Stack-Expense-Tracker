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

const { startOfMonth, endOfMonth } = require("date-fns"); // Import functions from date-fns to calculate the start and end of the month

exports.monthlyReports = async (req, res, next) => {
  try {
    const month = req.body.month; // The month in 'MM' format
    const year = new Date().getFullYear(); // You can adjust this to take year dynamically if required

    // Create start and end dates for the selected month
    const startDate = startOfMonth(new Date(`${year}-${month}-01`));
    const endDate = endOfMonth(new Date(`${year}-${month}-01`));

    // Find all expenses within the selected month range
    const expenses = await Expense.findAll({
      where: {
        createdAt: {
          [Op.between]: [startDate, endDate], // Filter between the start and end dates of the month
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
