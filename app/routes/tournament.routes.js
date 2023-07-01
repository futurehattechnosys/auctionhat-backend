const exApp = require("express");
const tournament_route = exApp();
const {
  tournament_create,
  tournament_get_all,
  tournament_get,
  tournament_update,
} = require("../controllers/tournament.controllers");

tournament_route.post("/add", tournament_create);

tournament_route.get("/get/all", tournament_get_all);

tournament_route.get("/get/:id", tournament_get);

tournament_route.put("/update/:id", tournament_update);

module.exports = tournament_route;
