const exApp = require("express");
const team_player_summary_route = exApp();
const {
  team_player_summary_create,
  team_player_summary_get_all,
  team_player_summary_get,
  team_player_summary_update,
} = require("../controllers/teamPlayerSummary.controllers");

team_player_summary_route.post("/add", team_player_summary_create);

team_player_summary_route.get("/get/all", team_player_summary_get_all);

team_player_summary_route.get("/get/:id", team_player_summary_get);

team_player_summary_route.put("/update/:id", team_player_summary_update);

module.exports = team_player_summary_route;
