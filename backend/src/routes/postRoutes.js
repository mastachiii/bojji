const express = require("express");
const postController = require("../controller/postController");
const commentController = require("../controller/commentController");
const passport = require("passport");

const route = express.Router();
console.dir(postController, { depth: null })
// GET
route.get("/:id", passport.authenticate("jwt", { session: false }), postController.getPost);

// POST
route.post("/create", passport.authenticate("jwt", { session: false }), postController.createPost);
route.post("/update/:id", passport.authenticate("jwt", { session: false }), postController.updatePost);
route.post("/delete/:id", passport.authenticate("jwt", { session: false }), postController.deletePost);
route.post("/:id/like", passport.authenticate("jwt", { session: false }), postController.likePost);
route.post("/:id/dislike", passport.authenticate("jwt", { session: false }), postController.dislikePost);
route.post("/:id/comment", passport.authenticate("jwt", { session: false }), commentController.createComment);

module.exports = route;