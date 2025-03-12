const express = require("express");
const controller = require("../controller/storyController");
const passport = require("passport");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const { uploadFile } = require("../helpers/uploadSupabase");

const route = express.Router();

// GET
route.get("/:id", passport.authenticate("jwt", { session: false }), controller.getStory);

// POST
route.post("/create", passport.authenticate("jwt", { session: false }), upload.single("image"), uploadFile, controller.createStory);
route.post("/delete/:id", passport.authenticate("jwt", { session: false }), controller.deleteStory);
route.post("/like/:id", passport.authenticate("jwt", { session: false }), controller.likeStory);
route.post("/dislike/:id", passport.authenticate("jwt", { session: false }), controller.dislikeStory);

module.exports = route;
