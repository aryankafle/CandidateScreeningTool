import express from "express";



import {
    addNewSavedList,
    deleteResumeResult,
    deleteUnusedFiles,
    getResumeFile,
    getResumeFilters,
    getResumeResult,
    modifyResumeResult,
    modifySavedList,
    removeOldSavedList,
} from "../controllers/Resumes.controller.js";

import { } from "../controllers/Uploads.controller.js";







const router = express.Router();



router.post("/create-list", addNewSavedList)
router.delete("/remove-list", removeOldSavedList)
router.post("/modify-list", modifySavedList)

router.get("/get-result", getResumeResult)
router.delete("/delete-result", deleteResumeResult)
router.get("/get-filters", getResumeFilters)
router.put("/modify-result", modifyResumeResult)

router.delete("/delete-unused", deleteUnusedFiles)
router.get("/get-file", getResumeFile)





export default router;