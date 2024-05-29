import express from "express"
import expressSession from "express-session"
import morgan from "morgan"
import passport from "./passport.js"

import { corsConfig } from "./config/cors.config.js"
import config from "./config/env.config.js"
import { sessionConfig } from "./config/session.config.js"

import cors from "cors"
import multer from "multer"
import { GridFsStorage } from "multer-gridfs-storage"
import { resumeDB } from "./database/MongoDB.database.js"
import { getFileMetadata } from "./middlewares/authorization/CreateFileMetadata.js"




import {
    authRoutes,
    resumeFilteringRoutes,
    resumeRoutes,
    uploadRoutes,

    userDataRoutes,
} from "./routes/index.js"





const app = express();

app.use(morgan('common'))

app.use(express.json());

app.use(express.urlencoded({
    extended: true
}))

app.get("/ping", (req, res) => {
    res.status(200).json({message: "pong"})
});

app.get("/", (req, res) => {
    res.status(200).json({message: "Archnatin CST Back-end Server"})
})






app.set('trust proxy', 1)

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', config.CLIENT)
    res.header('Access-Control-Allow-Credentials', true)
    res.header('Access-Controll-Allow-Headers', '*')
    next()
})



app.use(cors(corsConfig))

app.use(expressSession(sessionConfig))



app.use(passport.initialize())
app.use(passport.session())





app.use("/auth", authRoutes)



const storage = new GridFsStorage({

    db: resumeDB,
    file: getFileMetadata

})

const upload = multer({
    storage: storage
});

app.use("/uploads",
    upload.single("file"),
    uploadRoutes
)



app.use("/users",
    userDataRoutes
)

app.use("/filtering",
    resumeFilteringRoutes
)

app.use("/resumes",
    resumeRoutes
)





app.listen(config.EXPRESS_PORT, () => {
    console.log(`Express running. Server listening on port ${config.EXPRESS_PORT}.`)
});