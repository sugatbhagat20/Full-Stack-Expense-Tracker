const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const sequelize = require("./utils/database");
const cors = require("cors");
const userRoute = require("./routes/userRoute");
const expenseRoute = require("./routes/expenseRoute");
const purchaseRoute = require("./routes/purchaseRoute");
const leaderboardRouter = require("./routes/leaderboardRouter");
// const reportsRouter = require("./routes/reportsRouter");
const resetPasswordRouter = require("./routes/resetPasswordRouter");
const reportsRouter = require("./routes/reportsRoute");
const path = require("path");
const user = require("./model/userModel");
const expense = require("./model/expenseModel");
const order = require("./model/orderModel");
const ResetPassword = require("./model/resetPasswordModel");

const dotenv = require("dotenv");
dotenv.config();
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

app.use("/user", userRoute);
// app.use('path, callback());
app.use("/expense", expenseRoute);
app.use("/purchase", purchaseRoute);
app.use("/premium", leaderboardRouter);
app.use("/password", resetPasswordRouter);
app.use("/reports", reportsRouter);

// app.use((req, res) => {
//   console.log("urlll", req.url);
//   res.sendFile(path.join(__dirname, `public/${req.url}`));
// });

user.hasMany(expense);
expense.belongsTo(user);

user.hasMany(order);
order.belongsTo(user);

ResetPassword.belongsTo(user);
user.hasMany(ResetPassword);

// Use the CORS middleware
app.use(
  cors({
    origin: "http://13.233.165.10:4000", // Replace with your front-end origin
  })
);

sequelize
  .sync()
  .then((result) => {
    app.listen(4000);
  })
  .catch((err) => console.log(err));
