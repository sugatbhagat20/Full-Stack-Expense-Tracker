const expenses = require("../model/expenseModel");

exports.addExpense = (req, res, next) => {
  console.log(req.body);
  const name = req.body.name;
  const amount = req.body.amount;
  const expense = req.body.expense;

  expenses
    .create({
      name: name,
      amount: amount,
      expense: expense,
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
    .findAll()
    .then((expenses) => {
      res.json(expenses);
      // console.log(users);
    })
    .catch((err) => console.log(err));
};

exports.deleteExpense = (req, res, next) => {
  const expenseId = req.params.id;
  expenses
    .findByPk(expenseId)
    .then((expense) => {
      return expense.destroy();
    })
    .then((result) => res.json(result))
    .catch((err) => console.log(err));
};
