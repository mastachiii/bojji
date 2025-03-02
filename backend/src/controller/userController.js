const db = require("../model/userQueries");
const bcrypt = require("bcryptjs");
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
        async (req, res) => {
            const errors = validationResult(req);

            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

            next();
        },
    ];
}

module.exports = new User();
