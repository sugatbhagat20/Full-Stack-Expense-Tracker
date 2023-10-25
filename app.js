const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const sequelize = require("./utils/database");
const cors = require("cors");
const userRoute = require("./routes/userRoute");
const expenseRoute = require("./routes/expenseRoute");
app.use(cors());
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/user", userRoute);
// app.use('path, callback());
app.use("/expense", expenseRoute);

sequelize
  .sync()
  .then((result) => {
    app.listen(4000);
  })
  .catch((err) => console.log(err));
