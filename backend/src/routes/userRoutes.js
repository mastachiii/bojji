const express = require("express");
const controller = require("../controller/userController");
const passport = require("passport");
const route = express.Router();

// GET
route.get("/:id", passport.authenticate("jwt", { session: false }), controller.getData);

// POST
route.post("/sign-up", controller.signUp);
route.post("/log-in", controller.logIn);
// route.post("/follow/:id", controller.followUser);
// route.post("/unfollow/:id", controller.unfollowUser);

module.exports = route;
