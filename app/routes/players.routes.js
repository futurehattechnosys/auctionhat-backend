const exApp = require("express");
const players_route = exApp();
const {
  players_create,
  players_get_all,
  players_get,
  players_update,
} = require("../controllers/players.controllers");

players_route.post("/add", players_create);

players_route.get("/get/all", players_get_all);

players_route.get("/get/:id", players_get);

players_route.put("/update/:id", players_update);

module.exports = players_route;
