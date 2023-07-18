const exApp = require("express");
const user_route = exApp();
const {
  user_password_update,
  signin,
} = require("../controllers/user.controllers");

user_route.put("/password/update/:id", user_password_update);
user_route.post("/signin", signin);

module.exports = user_route;
