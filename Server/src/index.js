import express from "express";
import expressSession from "express-session";
import passport from "./passport.js"

import dotenv from "dotenv";
dotenv.config()

import cors from "cors";
import multer from "multer"



import { verifyUserRegistered } from "./middlewares/authorization/VerifyRegisteredUser.js";
import { verifyMongoDbConnection } from "./middlewares/authorization/VerifyMongoConnection.js";

import { 

    authRoutes, 

    resumeFilteringRoutes, 
    uploadRoutes, 

    testRoutes,
    
    selectionRoutes
    

} from "./routes/index.js"





const app = express();

app.disable("X-Powered-By");

app.set('trust proxy', 1)

app.use(cors({
    origin: "https://archnatincandidatescreeningtool.netlify.app",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
}))

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Origin", "https://archnatincandidatescreeningtool.netlify.app");
    res.header("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization, X-HTTP-Method-Override, Set-Cookie, Cookie");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    next();  
});

app.use(
    expressSession({
        secret: "secret_session",
        resave: false,
        saveUninitialized: true,
        cookie: { 
            sameSite: false,
            secure: !process.env.LOCAL,
        }
    })
)

app.use(passport.initialize())
app.use(passport.session())

app.use(express.json());





app.use("/auth", authRoutes)

const storage = multer.memoryStorage()
const upload = multer({
    storage: storage
});

app.use("/uploads", upload.array("files"), verifyMongoDbConnection, verifyUserRegistered, uploadRoutes)
app.use("/resume-filtering", verifyMongoDbConnection, verifyUserRegistered, resumeFilteringRoutes)

app.use("/test", testRoutes)

app.use("/selection", verifyMongoDbConnection, verifyUserRegistered, selectionRoutes)




app.get("/ping", (req, res) => {
    res.status(200).json({message: "pong"})
});

app.get("/", (req, res) => {
    res.status(200).json({message: "Archnatin CST Back-end Server"})
})





app.listen(process.env.EXPRESS_PORT, () => {
    console.log(`Express is running and server is listening on ${process.env.EXPRESS_PORT}`)
});