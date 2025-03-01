const express = require("express");

const app = express();

// Middlewares
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));