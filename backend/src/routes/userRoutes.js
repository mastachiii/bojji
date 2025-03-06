const express = require("express");
const controller = require("../controller/userController");
const passport = require("passport");

const route = express.Router();

// GET
route.get("/:id", passport.authenticate("jwt", { session: false }), controller.getData);

// POST
route.post("/sign-up", controller.signUp);
route.post("/log-in", controller.logIn);
route.post("/update", passport.authenticate("jwt", { session: false }), controller.updateProfile);
route.post("/follow/:username", passport.authenticate("jwt", { session: false }), controller.followUser);
route.post("/unfollow/:username", passport.authenticate("jwt", { session: false }), controller.unfollowUser);

module.exports = route;
