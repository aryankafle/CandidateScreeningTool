import express from "express";



import {
    addNewSavedList,
    deleteResumeResult,
    getResumeFile,
    getResumeFileMetadata,
    getResumeResult,
    modifySavedList,
    removeOldSavedList
} from "../controllers/Resumes.controller.js";

import { } from "../controllers/Uploads.controller.js";







const router = express.Router();



router.post("/create-list", addNewSavedList)
router.delete("/remove-list", removeOldSavedList)
router.post("/modify-list", modifySavedList)

router.get("/get-result", getResumeResult)
router.delete("/delete-result", deleteResumeResult)

router.get("/get-file", getResumeFile)
router.get("/get-file-metadata", getResumeFileMetadata)





export default router;