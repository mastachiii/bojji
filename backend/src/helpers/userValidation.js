const { body } = require("express-validator");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const validateSignUp = [
    body("username")
        .trim()
        .notEmpty()
        .withMessage("Username is required")
        .custom(async value => {
            const user = await prisma.user.findUnique({
                where: { username: value },
            });

            if (user) throw new Error("Username is already taken");
        }),
    body("email")
        .trim()
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Email is in an invalid format")
        .custom(async value => {
            const email = await prisma.user.findUnique({
                where: { email: value },
            });

            if (email) throw new Error("Email is already taken");
        }),
    body("password")
        .trim()
        .notEmpty()
        .withMessage("Password is required")
        .isAlphanumeric()
        .isLength({ min: 10 })
        .withMessage("Your password must be atleast 10 characters long and contains both numbers and letters"),
    body("passwordConfirm")
        .trim()
        .notEmpty()
        .withMessage("Password Confirm is required")
        .custom((value, { req }) => {
            return value === req.body.password;
        })
        .withMessage("Password does not match"),
];

const validateLogIn = [
    body("username").trim().notEmpty().withMessage("Username is required"),
    body("password").trim().notEmpty().withMessage("Password is required"),
];

module.exports = { validateSignUp, validateLogIn };
