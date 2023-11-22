const express = require("express");
const router = express.Router();
const expenseController = require("../controllers/expenseController");
const userAuthentication = require("../middleware/auth");
//router.use(express.static("public"));
//router.get("/", expenseController.getHomePage);
router.get("/expenses", userAuthentication, expenseController.getExpenses);

router.post("/addExpense", userAuthentication, expenseController.addExpense);

router.delete(
  "/deleteExpense/:id",
  userAuthentication,
  expenseController.deleteExpense
);
module.exports = router;
