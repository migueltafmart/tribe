const auth = require("./auth"),
controller = require("./controller"),
    routes = require("express").Router();

routes.post("/api/signup", auth.signUp);
routes.post("/api/login", auth.logIn);
routes.post("/api/update", auth.claims, auth.updateUser)
routes.get("/api/reload", auth.claims, auth.onReload);
routes.get("/api/logout", auth.claims, controller.logOut);
module.exports = routes;