import express from "express";

import {
    uploadResumesToDB,
    updateFilters
} from "../controllers/Uploads.controller.js"

import { verifyUserOwnsList } from "../middlewares/authorization/VerifyUserOwnsList.js";
import { addUploadLoadingState } from "../middlewares/CreateAndAddLoadingState.js"





const router = express.Router();



router.post("/upload-resumes-to-db", addUploadLoadingState, uploadResumesToDB)
router.post("/update-filters", verifyUserOwnsList, updateFilters)





export default router;