const express = require("express");
require("dotenv").config()

const PORT = process.env.PORT
const app = express();



app.get("/ping", (req, res) => {
    res.status(200).json({message: "pong"})
});



app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`)
});