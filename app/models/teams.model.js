const { DataTypes } = require("sequelize");
const fetchModules = require("./index");

const connection = fetchModules.newConnection;

const Teams = connection.define(
  "teams",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    shortname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ownername: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    companyname: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    team_logo: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "no_photo.jpg",
    },
    budget_point: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      comment: "available point from point",
    },
    point: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      comment: "team point that is provided",
    },
    total_player: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 15,
      comment: "total player including icon and sold player",
    },
    auction_player_count: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 11,
      comment: "auction player count",
    },
    pending_player_count: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 11,
      comment: "pending player count",
    },
    icon_player_count: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 4,
      comment: "icon player including captain",
    },
    token_player_count: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      comment: "token player count",
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      comment: "1-Active,2- InActive",
    },
    tournament_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
  },
  {
    timestamps: false,
  }
);
Teams.sync({ alter: true })
  .then()
  .catch((err) => console.log("Error in Teams - ", err));
module.exports = { Teams };
