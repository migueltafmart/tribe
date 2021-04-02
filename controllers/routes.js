const auth = require("./auth"),
controller = require("./controller"),
    routes = require("express").Router();

routes.post("/api/signup", auth.signUp);
routes.post("/api/login", auth.logIn);
routes.post("/api/update", auth.updateUser)
routes.get("/api/reload", auth.onReload);
module.exports = routes;