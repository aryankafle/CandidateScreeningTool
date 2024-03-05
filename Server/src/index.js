import express from "express";
// import passport from "passport";
import expressSession from "express-session";
import passport from "./passport.js"

import dotenv from "dotenv";
dotenv.config()

import cors from "cors";
import multer from "multer"



import { CLIENT_HOST, CLIENT_IP, SERVER_PORT } from "./util/ips.js";

import { verifyUserId } from "./middlewares/VerifyUserId.js";

import { 

    authRoutes, 

    resumeFilteringRoutes, 
    uploadRoutes, 

    testRoutes,

} from "./routes/index.js"





const app = express();

app.set('trust proxy', 1)
app.use(
    expressSession({
        secret: "secret_session",
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false } //CHANGE TO TRUE EVENTUALLY IDK HOW
    })
)

app.use(passport.initialize())
app.use(passport.session())

app.use(cors({
    origin: CLIENT_IP,
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
}))

app.use(express.json());





app.use("/auth", authRoutes)

const storage = multer.memoryStorage()
const upload = multer({
    storage: storage
});

app.use("/uploads", upload.array("files"), verifyUserId, uploadRoutes)
app.use("/resume-filtering", verifyUserId, resumeFilteringRoutes)

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