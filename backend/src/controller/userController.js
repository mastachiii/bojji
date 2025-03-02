const db = require("../model/userQueries");
const bcrypt = require("bcryptjs");
const { validateSignUp } = require("../helpers/userValidation");
const { validationResult } = require("express-validator");

class User {
    signUp = [
        validateSignUp,
        async (req, res, next) => {
            const errors = validationResult(req);

            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

            bcrypt.hash(req.body.password, 10, async (err, hash) => {
                req.body.password = hash;

                await db.createUser(req.body);

                res.sendStatus(201);
            });
        },
    ];
}

module.exports = new User();
