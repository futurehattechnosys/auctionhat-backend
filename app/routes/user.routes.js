const exApp = require("express");
const user_route = exApp();
const { user_password_update } = require("../controllers/user.controllers");

user_route.put("/password/update/:id", user_password_update);

module.exports = user_route;
