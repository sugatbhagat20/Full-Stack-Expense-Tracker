const express = require("express");
const router = express.Router();
const expenseController = require("../controllers/expenseController");

//router.use(express.static("public"));
//router.get("/", expenseController.getHomePage);
router.get("/expenses", expenseController.getExpenses);

router.post("/addExpense", expenseController.addExpense);

router.delete("/deleteExpense/:id", expenseController.deleteExpense);
module.exports = router;
