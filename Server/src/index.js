import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import multer from "multer"

import resumeFilteringRoutes from "./routes/resumeFiltering.routes.js"
import uploadRoutes from "./routes/uploads.routes.js"
import testRoutes from "./routes/test.routes.js"





dotenv.config()
const PORT = process.env.PORT || 3001



const storage = multer.memoryStorage()
const upload = multer({
    storage: storage
});



const app = express();

app.use(cors());
app.use(express.json());



app.use("/uploads", upload.array("files"), uploadRoutes)
app.use("/resume-filtering", resumeFilteringRoutes)
app.use("/test", testRoutes)



app.get("/ping", (req, res) => {
    res.status(200).json({message: "pong"})
});

app.get("/", (req, res) => {
    res.status(200).json({message: "Archnatin CST Back-end Server"})
})

app.listen(PORT, () => {
    console.log(`Express is running and server is listening on ${PORT}`)
});