import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import multer from "multer"
//import requiresAuth from "express-openid-connect";
import Auth from 'express-openid-connect'
import auth0Config from "./config/auth0.config.js"

import resumeFilteringRoutes from "./routes/ResumeFiltering.routes.js"
import uploadRoutes from "./routes/Uploads.routes.js"
import testRoutes from "./routes/Test.routes.js"




dotenv.config()
const PORT = process.env.PORT || 3001



const storage = multer.memoryStorage()
const upload = multer({
    storage: storage
});
const {auth, requiresAuth} = Auth
const app = express();

app.use(cors());
app.use(express.json());
app.use(auth(auth0Config));
//app.use(requiresAuth());




app.use("/uploads", upload.array("files"), uploadRoutes)
app.use("/resume-filtering", resumeFilteringRoutes)
app.use("/test", testRoutes)



app.get("/ping", (req, res) => {
    res.status(200).json({message: "pong"})
});

app.get("/", (req, res) => {
    res.status(200).json({message: "Archnatin CST Back-end Server"})
})
app.get('/authtest', (req, res) => {
    res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
  });

app.get('/profile', requiresAuth(), (req, res) => {
    res.send(JSON.stringify(req.oidc.user));
  });

app.listen(PORT, () => {
    console.log(`Express is running and server is listening on ${PORT}`)
});