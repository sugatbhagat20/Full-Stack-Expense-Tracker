const Sequelize = require("sequelize");

const sequelize = require("../utils/database");

const expenses = sequelize.define("expenses", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  amount: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  expense: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = expenses;
