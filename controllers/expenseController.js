const expenses = require("../model/expenseModel");
const users = require("../model/userModel");
const sequelize = require("../utils/database");
exports.addExpense = (req, res, next) => {
  console.log(req.body);
  const name = req.body.name;
  const amount = req.body.amount;
  const expense = req.body.expense;

  const totalExpense = Number(req.user.totalExpenses) + Number(amount);
  users
    .update(
      {
        totalExpenses: totalExpense,
      },
      { where: { id: req.user.id } }
    )
    .catch((err) => console.error(err));

  expenses
    .create({
      name: name,
      amount: amount,
      expense: expense,
      userId: req.user.id,
    })
    .then((result) => {
      console.log("Added to Expense");
      //res.redirect("/get");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getExpenses = (req, res, next) => {
  expenses
    .findAll({ where: { userId: req.user.id } })
    .then((expenses) => {
      res.json(expenses);
      // console.log(users);
    })
    .catch((err) => console.log(err));
};

exports.deleteExpense = (req, res, next) => {
  const id = req.params.id;
  expenses
    .findByPk(id)
    .then((expense) => {
      totalExpense = Number(req.user.totalExpenses) - Number(expense.amount);
      users
        .update(
          {
            totalExpenses: totalExpense,
          },
          { where: { id: req.user.id } }
        )
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));

  expenses
    .destroy({ where: { id: id, userId: req.user.id } })
    .then((result) => {
      res.redirect("/expense");
    })
    .catch((err) => console.log(err));
};
