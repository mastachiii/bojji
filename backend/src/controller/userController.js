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

            const user = await db.getUserByUsername({ username: req.body.username });
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

    async getData(req, res, next) {
        const user = await db.getUser({ id: req.user.id });

        res.status(200).json({ user });
    }
}

module.exports = new User();
