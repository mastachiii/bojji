const db = require("../model/userQueries");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validateSignUp, validateLogIn } = require("../helpers/userValidation");
const { validationResult } = require("express-validator");

class User {
    signUp = [
        validateSignUp,
        async (req, res, next) => {
            const errors = validationResult(req);

            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

            // Default profile
            req.body.profilePicture =
                "https://twacmlphonvffvohkpbj.supabase.co/storage/v1/object/public/bojji//360_F_410437733_hdq4Q3QOH9uwh0mcqAhRFzOKfrCR24Ta.jpg";

            bcrypt.hash(req.body.password, 10, async (err, hash) => {
                if (err) return next(err);

                req.body.password = hash;

                await db.createUser(req.body);

                res.sendStatus(201);
            });
        },
    ];

    logIn = [
        validateLogIn,
        async (req, res, next) => {
            const errors = validationResult(req);

            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

            const user = await db.getUserAuth({ username: req.body.username });
            if (!user) return res.status(401).json({ error: "Incorrect username or password" });

            const passwordIsMatch = await bcrypt.compare(req.body.password, user.password);
            if (!passwordIsMatch) return res.status(401).json({ error: "Incorrect username or password" });

            jwt.sign({ user }, process.env.SECRET, { expiresIn: "1d" }, (err, token) => {
                if (err) return next(err);

                res.status(200).json({ token });
            });

            next();
        },
    ];

    async getUserData(req, res) {
        const user = await db.getUserByUsername({ username: req.params.username });

        res.status(200).json({ user });
    }

    async getUserSelfData(req, res) {
        const user = await db.getUserByUsername({ username: req.user.username });

        res.status(200).json({ user });
    }

    async followUser(req, res) {
        if (req.user.username === req.params.username) return res.sendStatus(400);

        await db.followUser({ id: req.user.id, username: req.params.username });

        res.sendStatus(200);
    }

    async unfollowUser(req, res) {
        if (req.user.username === req.params.username) return res.sendStatus(400);

        await db.unfollowUser({ id: req.user.id, username: req.params.username });

        res.sendStatus(200);
    }

    async updateProfile(req, res) {
        const user = await db.getUserByUsername({ username: req.body.username });

        if (user && req.user.username !== user.username) return res.status(400).send({ msg: "Username is already taken." });

        await db.updateUser({
            profilePicture: req.body.profilePicture !== "null" ? req.body.profilePicture : req.user.profilePicture,
            username: req.body.username || req.user.username,
            fullName: req.body.fullName || req.user.fullName,
            bio: req.body.bio,
            id: req.user.id,
        });

        res.sendStatus(200);
    }

    async searchUsers(req, res) {
        const search = await db.searchUsers({ filter: req.body.search });

        res.status(200).json({ search });
    }
}

module.exports = new User();
