const express = require("express");
const conversationController = require("../controller/conversationController");
const messageController = require("../controller/messageController");
const passport = require("passport");

const route = express.Router();

// GET
route.get("/:id", passport.authenticate("jwt", { session: false }), conversationController.getConversation);

// POST
route.post("/create", passport.authenticate("jwt", { session: false }), conversationController.createConversation);
route.post("/:id/leave", passport.authenticate("jwt", { session: false }), conversationController.leaveConversation);
route.post("/:id/message", passport.authenticate("jwt", { session: false }), messageController.createMessage);
route.post("/:id/message/:messageId/delete", passport.authenticate("jwt", { session: false }), messageController.deleteMessage);

module.exports = route;