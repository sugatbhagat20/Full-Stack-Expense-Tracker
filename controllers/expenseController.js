const expenses = require("../model/expenseModel");
const users = require("../model/userModel");
exports.addExpense = (req, res, next) => {
  console.log(req.body);
  const name = req.body.name;
  const amount = req.body.amount;
  const expense = req.body.expense;

  users.update(
    {
      totalExpenses: req.user.totalExpenses + amount,
    },
    { where: { id: req.user.id } }
  );

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
  expenses.findByPk(id).then((expense) => {
    users.update(
      {
        totalExpenses: req.user.totalExpenses - expense.amount,
      },
      { where: { id: req.user.id } }
    );
  });
  expenses
    .destroy({ where: { id: id, userId: req.user.id } })
    .then((result) => {
      res.redirect("/homePage");
    })
    .catch((err) => console.log(err));
};
