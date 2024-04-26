import express from "express";

import {

    uploadResumeToDatabase
    
} from "../controllers/Uploads.controller.js"





const router = express.Router();



router.post("/upload-resume", uploadResumeToDatabase)





export default router;