import express from "express";



import {
    
    runTextScanOnResume,

    addNewSavedList,
    removeOldSavedList,

    getResumeResult,
    getResumeFile,
    getResumeFilters,
    deleteResumeResult,
    modifyResumeResult,

    deleteUnusedFiles,

} from "../controllers/Resumes.controller.js";

import {


    
} from "../controllers/Uploads.controller.js";







const router = express.Router();



router.put("/create-text-scan", runTextScanOnResume)

router.post("/create-list", addNewSavedList)
router.delete("/remove-list", removeOldSavedList)

router.get("/get-result", getResumeResult)
router.delete("/delete-result", deleteResumeResult)
router.get("/get-filters", getResumeFilters)
router.put("/modify-result", modifyResumeResult)

router.delete("/delete-unused", deleteUnusedFiles)
router.get("/get-file", getResumeFile)





export default router;