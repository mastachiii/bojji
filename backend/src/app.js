const express = require("express");
const passport = require("passport");
const userStrategy = require("./passport/passport");
const user = require("./routes/userRoutes");
const post = require("./routes/postRoutes");
const story = require("./routes/storyRoutes");

const app = express();

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
passport.use(userStrategy);

// Routes
app.use("/user", user);
app.use("/post", post);
app.use("/story", story);

// Error handler
app.use((err, req, res, next) => {
    console.error(err);

    res.json({ err });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));