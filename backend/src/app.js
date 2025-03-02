const express = require("express");
const passport = require("passport");
const userStrategy = require("./passport/passport");
const user = require("./routes/userRoutes");

const app = express();

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
passport.use(userStrategy);

// Routes
app.use("/user", user);

// Error handler
app.use((err, req, res, next) => {
    console.error(err);

    res.json({ err });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
