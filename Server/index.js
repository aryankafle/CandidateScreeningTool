const express = require("express");
require("dotenv").config()
const path = require("path")

const PORT = process.env.PORT
const app = express();



app.use(express.static(path.resolve(__dirname, '../cstclient/public')));



app.get("/ping", (req, res) => {
    res.status(200).json({message: "pong"})
});

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../cstclient/public', 'index.html'));
});



app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`)
});