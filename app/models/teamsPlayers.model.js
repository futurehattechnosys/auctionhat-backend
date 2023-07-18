const { DataTypes } = require("sequelize");
const fetchModules = require("./index");

const connection = fetchModules.newConnection;

const TeamPlayers = connection.define(
  "teams_players",
  {
    team_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    player_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    tournament_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    sold_points: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    is_captain: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "Icon / Token / Sold / Unsold",
    },
    created: {
      type: DataTypes.DATE(3),
      allowNull: false,
      defaultValue: connection.literal("CURRENT_TIMESTAMP(3)"),
    },
  },
  {
    timestamps: false,
  }
);
TeamPlayers.sync({ alter: true })
  .then()
  .catch((err) => console.log("Error in TeamPlayers - ", err));
module.exports = { TeamPlayers };
