const auth = require("./auth"),
  controller = require("./controller"),
  routes = require("express").Router();

routes.post("/api/signup", auth.signUp);
routes.post("/api/login", auth.logIn);
routes.post("/api/logout", auth.claims, controller.leave);
routes.post("/api/update/:action?", auth.claims, auth.updateUser);
routes.get("/api/reload", auth.claims, auth.onReload);
routes.get("/api/nearby", controller.nearby);
module.exports = routes;
