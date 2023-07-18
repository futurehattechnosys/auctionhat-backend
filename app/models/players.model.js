const { DataTypes } = require("sequelize");
const fetchModules = require("./index");

const connection = fetchModules.newConnection;

const Players = connection.define(
  "players",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    formno: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 0,
    },
    memberno: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 0,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    photo: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: "no_photo.jpg",
    },
    batting_style: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "No",
      comment: "No / LEFT HAND/ RIGHT HAND",
    },
    bowling_style: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "No",
      comment:
        "No/LEFT ARM FASTER/RIGHT ARM FASTER/LEFT ARM SPIN/RIGHT ARM SPIN/LEFT ARM MEDIUM FAST/RIGHT ARM MEDIUM FAST",
    },
    is_wk: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "No",
      comment: "No / Yes",
    },
    base_point: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "10000",
    },
    previous_team: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    previous_point: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      comment: "1. Active 2. InActive",
    },
  },
  {
    paranoid: true,
    timestamps: false,
    hooks: {
      afterCreate: (players) => {
        const playerObj = {
          formno: players.id,
        };

        Players.update(playerObj, { where: { id: players.id } });
      },
    },
  }
);
Players.sync({ alter: true })
  .then()
  .catch((err) => console.log("Error in Players - ", err));
module.exports = { Players };
