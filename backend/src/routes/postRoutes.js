const express = require("express");
const controller = require("../controller/postController");
const passport = require("passport");

const route = express.Router();

// GET
route.get("/:id", passport.authenticate("jwt", { session: false }), controller.getPost);

// POST
route.post("/create", passport.authenticate("jwt", { session: false }), controller.createPost);
route.post("/update/:id", passport.authenticate("jwt", { session: false }), controller.updatePost);
route.post("/delete/:id", passport.authenticate("jwt", { session: false }), controller.deletePost);
route.post("/:id/like", passport.authenticate("jwt", { session: false }), controller.likePost);

module.exports = route;
