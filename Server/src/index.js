import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import linkedInRoutes from "./routes/LinkedIn.routes.js"
import mySQLRoutes from "./routes/MySQL.routes.js"
import openAIRoutes from "./routes/OpenAI.routes.js"





dotenv.config()
const PORT = process.env.PORT || 3001

const app = express();

app.use(cors());
app.use(express.json());

app.use("/linkedIn", linkedInRoutes)
app.use("/mySQL", mySQLRoutes)
app.use("/openAI", openAIRoutes)



app.get("/ping", (req, res) => {
    res.status(200).json({message: "pong"})
});

app.get("/", (req, res) => {
    res.status(200).json({message: "Archnatin CST Back-end Server"})
})

app.listen(PORT, () => {
    console.log(`Express is running and server is listening on ${PORT}`)
});