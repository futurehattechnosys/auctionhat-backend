const { DataTypes } = require("sequelize");
const fetchModules = require("./index");

const connection = fetchModules.newConnection;

const pointSlab = connection.define(
  "point_slab",
  {
    from_point: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    to_point: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    point: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);
pointSlab
  .sync({ alter: true })
  .then()
  .catch((err) => console.log("Error in pointSlab - ", err));
module.exports = { pointSlab };
