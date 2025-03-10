const express = require("express");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const controller = require("../controller/userController");
const passport = require("passport");

const route = express.Router();

// GET
route.get("/", passport.authenticate("jwt", { session: false }), controller.getUserSelfData);
route.get("/:username", passport.authenticate("jwt", { session: false }), controller.getUserData);

// POST
route.post("/sign-up", controller.signUp);
route.post("/log-in", controller.logIn);
route.post("/update", upload.fields([{ name: "profilePicture" }]), passport.authenticate("jwt", { session: false }), controller.updateProfile);
route.post("/search", passport.authenticate("jwt", { session: false }), controller.searchUsers);
route.post("/follow/:username", passport.authenticate("jwt", { session: false }), controller.followUser);
route.post("/unfollow/:username", passport.authenticate("jwt", { session: false }), controller.unfollowUser);

module.exports = route;
