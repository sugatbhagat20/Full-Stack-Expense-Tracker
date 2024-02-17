var expenses = require("../model/expenseModel");
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
    window.location.reload();
  } catch {
    async (err) => {
      await t.rollback();
      console.log(err);
    };
  }
};

// exports.getExpenses = async (req, res) => {
//   try {
//     const page = req.query.page || 1;
//     console.log(req.user);
//     const exp = req.user.getExpenses({
//       offset: (page - 1) * 2,
//       limit: 2,
//     });
//     const totalExp = req.user.countExpenses();
//     const [expenses, totalExpenses] = await Promise.all([exp, totalExp]);
//     return res.json({ expenses, totalExpenses });
//   } catch (e) {
//     console.log(e);
//     return res
//       .status(500)
//       .json({ success: false, msg: "Internal server error" });
//   }
// };
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
    res.json(expenses);
  } catch (err) {
    console.log(err);
  }
};

// exports.getAllExpenses = async (req, res, next) => {
//   try {
//     const expense = await expenses.findAll({ where: { userId: req.user.id } });
//     await res.json(expense);
//   } catch (err) {
//     console.log(err);
//   }
// };

exports.getExpenses = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const perPage = req.query.perPage || 5;
    const offset = (page - 1) * perPage;

    const records = await expenses.findAll({ limit: perPage, offset: offset });
    res.json(records);
  } catch (error) {
    console.error("Error fetching records:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
