const exApp = require("express");
const point_slab_route = exApp();
const {
  point_slab_create,
  point_slab_get_all,
  point_slab_get,
  point_slab_update,
} = require("../controllers/pointSlab.controllers");

point_slab_route.post("/add", point_slab_create);

point_slab_route.get("/get/all", point_slab_get_all);

point_slab_route.get("/get/:id", point_slab_get);

point_slab_route.put("/update/:id", point_slab_update);

module.exports = point_slab_route;
