const express = require("express");
const controller = require("../controller/conversationController");
const passport = require("passport");

const route = express.Router();

// POST
route.post("/create", passport.authenticate("jwt", { session: false }), controller.createConversation);
route.post("/:id/leave", passport.authenticate("jwt", { session: false }), controller.leaveConversation);

module.exports = route;
