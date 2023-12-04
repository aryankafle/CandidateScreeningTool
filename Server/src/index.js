import express from "express";
import dotenv from "dotenv";

import linkedInRoutes from "./routes/linkedIns.js"
import mySQLRoutes from "./routes/mySQLs.js"
import openAIRoutes from "./routes/openAIs.js"





dotenv.config()
const PORT = process.env.PORT || 3001

const app = express();

app.use("/linkedIn", linkedInRoutes)
app.use("/mySQL", mySQLRoutes)
app.use("/openAIRoutes", openAIRoutes)

app.get("/ping", (req, res) => {
    res.status(200).json({message: "pong"})
});

app.get("/", (req, res) => {
    res.status(200).json({message: "Back-end Server"})
})

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`)
});