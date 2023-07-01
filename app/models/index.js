const dbConfig = require("../config/db.config");

const { Sequelize } = require("sequelize");
const newConnection = new Sequelize(
  dbConfig.DB,
  dbConfig.USER,
  dbConfig.PASSWORD,
  {
    host: dbConfig.HOST,
    port: dbConfig.PORT,
    dialect: dbConfig.dialect,
    operatorsAliases: 0,
    logging: false,
    pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle,
    },
    define: {
      freezeTableName: true,
    },
  }
);
const db = {};

db.Sequelize = Sequelize;
db.newConnection = newConnection;

module.exports = db;
