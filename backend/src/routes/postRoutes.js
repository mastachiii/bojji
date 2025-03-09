const express = require("express");
const postController = require("../controller/postController");
const commentController = require("../controller/commentController");
const replyController = require("../controller/replyController");
const passport = require("passport");
const multer = require("multer");
const uploadFiles = require("../helpers/uploadSupabase");
const upload = multer({ storage: multer.memoryStorage() });

const route = express.Router();

// GET
route.get("/:id", passport.authenticate("jwt", { session: false }), postController.getPost);
route.get("/comment/:id", passport.authenticate("jwt", { session: false }), commentController.getComment);
route.get("/comment/:id/reply/:replyId", passport.authenticate("jwt", { session: false }), replyController.getReply);

// POST
route.post("/create", passport.authenticate("jwt", { session: false }), upload.array("images", 20), uploadFiles, postController.createPost);
route.post("/update/:id", passport.authenticate("jwt", { session: false }), postController.updatePost);
route.post("/delete/:id", passport.authenticate("jwt", { session: false }), postController.deletePost);
route.post("/:id/like", passport.authenticate("jwt", { session: false }), postController.likePost);
route.post("/:id/dislike", passport.authenticate("jwt", { session: false }), postController.dislikePost);
route.post("/:id/comment", passport.authenticate("jwt", { session: false }), commentController.createComment);
route.post("/comment/:id/like", passport.authenticate("jwt", { session: false }), commentController.likeComment);
route.post("/comment/:id/dislike", passport.authenticate("jwt", { session: false }), commentController.dislikeComment);
route.post("/comment/:id/delete", passport.authenticate("jwt", { session: false }), commentController.deleteComment);
route.post("/comment/:id/reply", passport.authenticate("jwt", { session: false }), replyController.createReply);
route.post("/comment/:id/reply/:replyId/delete", passport.authenticate("jwt", { session: false }), replyController.deleteReply);
route.post("/comment/:id/reply/:replyId/like", passport.authenticate("jwt", { session: false }), replyController.likeReply);
route.post("/comment/:id/reply/:replyId/dislike", passport.authenticate("jwt", { session: false }), replyController.dislikeReply);

module.exports = route;
