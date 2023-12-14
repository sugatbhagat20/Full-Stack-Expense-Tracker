const Sequelize = require("sequelize");

const sequelize = require("../utils/database");

const expenses = sequelize.define(
  "expenses",
  {
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
    createdAt: {
      type: Sequelize.DATEONLY,
      defaultValue: Sequelize.NOW,
    },
    updatedAt: {
      type: Sequelize.DATEONLY,
      defaultValue: Sequelize.NOW,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = expenses;
