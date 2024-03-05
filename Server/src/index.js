import express from "express";

import dotenv from "dotenv";
dotenv.config()

import cors from "cors";
import multer from "multer"



import { SERVER_PORT } from "./util/ips.js";

import { 

    authRoutes, 

    resumeFilteringRoutes, 
    uploadRoutes, 

    testRoutes,

} from "./routes/index.js"





const app = express();

app.use(cors())
app.use(express.json());





const storage = multer.memoryStorage()
const upload = multer({
    storage: storage
});

app.use("/uploads", upload.array("files"), uploadRoutes)
app.use("/resume-filtering", resumeFilteringRoutes)

app.use("/test", testRoutes)





app.get("/ping", (req, res) => {
    res.status(200).json({message: "pong"})
});

app.get("/", (req, res) => {
    res.status(200).json({message: "Archnatin CST Back-end Server"})
})





app.listen(SERVER_PORT, () => {
    console.log(`Express is running and server is listening on ${SERVER_PORT}`)
});