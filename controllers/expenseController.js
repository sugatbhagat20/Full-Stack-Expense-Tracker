const expenses = require("../model/expenseModel");
const users = require("../model/userModel");
const sequelize = require("../utils/database");

exports.addExpense = async (req, res, next) => {
  console.log(req.body);
  const t = await sequelize.transaction();
  try {
    const name = req.body.name;
    const amount = req.body.amount;
    const expense = req.body.expense;

    const totalExpense = Number(req.user.totalExpenses) + Number(amount);
    await users
      .update(
        {
          totalExpenses: totalExpense,
        },
        { where: { id: req.user.id } },
        { transaction: t }
      )
      .catch((err) => console.error(err));

    await expenses
      .create(
        {
          name: name,
          amount: amount,
          expense: expense,
          userId: req.user.id,
        },
        { transaction: t }
      )
      .then((result) => {
        console.log("Added to Expense");
        //res.redirect("/get");
      })
      .catch((err) => {
        console.log(err);
      });
    await t.commit();
  } catch {
    async (err) => {
      await t.rollback();
      console.log(err);
    };
  }
};

exports.getExpenses = async (req, res, next) => {
  try {
    const expense = await expenses.findAll({ where: { userId: req.user.id } });
    await res.json(expense);
  } catch (err) {
    console.log(err);
  }
};
//

exports.deleteExpense = async (req, res, next) => {
  const id = req.params.id;
  try {
    const expense = await expenses.findByPk(id);
    await users.update(
      {
        totalExpenses: req.user.totalExpenses - expense.amount,
      },
      { where: { id: req.user.id } }
    );
    await expenses.destroy({ where: { id: id, userId: req.user.id } });
    res.redirect("/expense");
  } catch (err) {
    console.log(err);
  }
};
