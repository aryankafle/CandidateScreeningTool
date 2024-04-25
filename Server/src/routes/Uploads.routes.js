import express from "express";

import {

    uploadResumeToDatabase
    
} from "../controllers/Uploads.controller.js"





const router = express.Router();



router.post("/upload-resumes-to-db", uploadResumeToDatabase)





export default router;