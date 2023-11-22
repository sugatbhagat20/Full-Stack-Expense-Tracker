const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const sequelize = require("./utils/database");
const cors = require("cors");
const userRoute = require("./routes/userRoute");
const expenseRoute = require("./routes/expenseRoute");
const purchaseRoute = require("./routes/purchaseRoute");
const leaderboardRouter = require("./routes/leaderboardRouter");
const user = require("./model/userModel");
const expense = require("./model/expenseModel");
const order = require("./model/orderModel");
app.use(cors());

const dotenv = require("dotenv");
dotenv.config();
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/user", userRoute);
// app.use('path, callback());
app.use("/expense", expenseRoute);
app.use("/purchase", purchaseRoute);
app.use("/premium", leaderboardRouter);
user.hasMany(expense);
expense.belongsTo(user);

user.hasMany(order);
order.belongsTo(user);

sequelize
  .sync()
  .then((result) => {
    app.listen(4000);
  })
  .catch((err) => console.log(err));
