const express = require("express");
const postController = require("../controller/postController");
const commentController = require("../controller/commentController");
const replyController = require("../controller/replyController");
const passport = require("passport");

const route = express.Router();

// GET
route.get("/:id", passport.authenticate("jwt", { session: false }), postController.getPost);
route.get("/comment/:id", passport.authenticate("jwt", { session: false }), commentController.getComment);

// POST
route.post("/create", passport.authenticate("jwt", { session: false }), postController.createPost);
route.post("/update/:id", passport.authenticate("jwt", { session: false }), postController.updatePost);
route.post("/delete/:id", passport.authenticate("jwt", { session: false }), postController.deletePost);
route.post("/:id/like", passport.authenticate("jwt", { session: false }), postController.likePost);
route.post("/:id/dislike", passport.authenticate("jwt", { session: false }), postController.dislikePost);
route.post("/:id/comment", passport.authenticate("jwt", { session: false }), commentController.createComment);
route.post("/comment/:id/like", passport.authenticate("jwt", { session: false }), commentController.likeComment);
route.post("/comment/:id/dislike", passport.authenticate("jwt", { session: false }), commentController.dislikeComment);
route.post("/comment/:id/delete", passport.authenticate("jwt", { session: false }), commentController.deleteComment);
route.post("/comment/:id/reply", passport.authenticate("jwt", { session: false }), replyController.createReply);

module.exports = route;
