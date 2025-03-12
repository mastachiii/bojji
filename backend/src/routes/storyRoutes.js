const express = require("express");
const controller = require("../controller/storyController");
const passport = require("passport");
const { uploadFile } = require("../helpers/uploadSupabase");

const route = express.Router();

// GET
route.get("/:id", passport.authenticate("jwt", { session: false }), controller.getStory);

// POST
route.post("/create", passport.authenticate("jwt", { session: false }), uploadFile, controller.createStory);
route.post("/delete/:id", passport.authenticate("jwt", { session: false }), controller.deleteStory);
route.post("/like/:id", passport.authenticate("jwt", { session: false }), controller.likeStory);
route.post("/dislike/:id", passport.authenticate("jwt", { session: false }), controller.dislikeStory);

module.exports = route;
