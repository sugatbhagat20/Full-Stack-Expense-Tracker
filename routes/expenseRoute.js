const express = require("express");
const router = express.Router();
const expenseController = require("../controllers/expenseController");
const userAuthentication = require("../middleware/auth");
//router.use(express.static("public"));
//router.get("/", expenseController.getHomePage);
router.get("/expenses", userAuthentication, expenseController.getExpenses);
// router.get(
//   "/expenses/:page",
//   userAuthentication,
//   expenseController.getAllExpensesforPagination
// );
router.post("/addExpense", userAuthentication, expenseController.addExpense);
//router.get("/download", userAuthentication, expenseController.downloadExpense);
router.delete(
  "/deleteExpense/:id",
  userAuthentication,
  expenseController.deleteExpense
);
module.exports = router;
