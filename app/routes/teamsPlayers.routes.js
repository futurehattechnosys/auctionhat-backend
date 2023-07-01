const exApp = require("express");
const teams_players_route = exApp();
const {
  teams_players_create,
  teams_players_get_all,
  teams_players_get,
  teams_players_update,
} = require("../controllers/teamsPlayers.controllers");

teams_players_route.post("/add", teams_players_create);

teams_players_route.get("/get/all", teams_players_get_all);

teams_players_route.get("/get/:id", teams_players_get);

teams_players_route.put("/update/:id", teams_players_update);

module.exports = teams_players_route;
