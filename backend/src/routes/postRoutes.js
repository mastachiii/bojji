const express = require("express");
const passport = require("passport");

const route = express.Router();

// GET
route.get("/:id", passport.authenticate("jwt", { session: false }), controller.getPost);

// POST
route.post("/create", passport.authenticate("jwt", { session: false }), controller.createPost);

module.exports = route;