import express from "express";

import {
    getUploadId,
} from "../controllers/Uploads.controller.js";





const router = express.Router();



router.post("/upload-resume", getUploadId)





export default router;