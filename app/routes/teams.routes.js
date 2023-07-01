const exApp = require("express");
const teams_route = exApp();
const {
  teams_create,
  teams_get_all,
  teams_get,
  teams_update,
} = require("../controllers/teams.controllers");

teams_route.post("/add", teams_create);

teams_route.get("/get/all", teams_get_all);

teams_route.get("/get/:id", teams_get);

teams_route.put("/update/:id", teams_update);

module.exports = teams_route;
