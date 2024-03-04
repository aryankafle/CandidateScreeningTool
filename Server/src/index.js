import express from "express";

import dotenv from "dotenv";
dotenv.config()

import cors from "cors";
import multer from "multer"
import auth0Config from "./config/auth0.config.js"
import { auth } from 'express-openid-connect'



import { SERVER_PORT } from "./util/ips.js";

import { corsConfig } from "./config/cors.config.js";

import { 

    authRoutes, 

    resumeFilteringRoutes, 
    uploadRoutes, 

    testRoutes,

} from "./routes/index.js"





const app = express();

app.use(cors({ origin: corsConfig }));
app.use(express.json());





app.use(auth(auth0Config));
app.use("/auth", authRoutes)

// app.use(requiresAuth());





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