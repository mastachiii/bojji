const express = require("express");
const controller = require("../controller/storyController");
const passport = require("passport");

const route = express.Router();

// GET
route.get("/story/:id", passport.authenticate("jwt", { session: false }), controller.getStory);

// POST
route.post("/create", passport.authenticate("jwt", { session: false }), controller.createStory);
route.post("/delete/:id", passport.authenticate("jwt", { session: false }), controller.deleteStory);

module.exports = route;
