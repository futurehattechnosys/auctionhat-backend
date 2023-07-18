const { DataTypes } = require("sequelize");
const fetchModules = require("./index");

const connection = fetchModules.newConnection;

const Tournament = connection.define(
  "tournament",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    year: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    logo: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "no_photo.jpg",
    },
    auction_theme: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "classic",
    },
    auction_template: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "A11",
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      comment: "1. Active 2. InActive",
    },
  },
  {
    timestamps: false,
  }
);
Tournament.sync({ alter: true })
  .then()
  .catch((err) => console.log("Error in Tournament - ", err));
module.exports = { Tournament };
