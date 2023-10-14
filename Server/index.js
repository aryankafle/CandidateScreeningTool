const express = require("express");
require("dotenv").config()
const path = require("path")

const PORT = process.env.PORT || 3001
const app = express();

app.get("/ping", (req, res) => {
    res.status(200).json({message: "pong"})
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`)
});