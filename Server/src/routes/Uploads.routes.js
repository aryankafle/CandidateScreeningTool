import express from "express";

import {
    uploadResumesToDB,
    updateFilters
} from "../controllers/Uploads.controller.js"

import { verifyUserOwnsList } from "../middlewares/authorization/VerifyUserOwnsList.js";





const router = express.Router();



router.post("/upload-resumes-to-db", uploadResumesToDB)
router.post("/update-filters", verifyUserOwnsList, updateFilters)





export default router;