import express from "express";



import {

    addNewSavedList,
    removeOldSavedList,
    modifySavedList,

    getResumeResult,
    deleteResumeResult,
    modifyResumeResult,

    deleteUnusedFiles,

} from "../controllers/Resumes.controller.js";

import {


    
} from "../controllers/Uploads.controller.js";







const router = express.Router();



router.post("/create-list", addNewSavedList)
router.delete("/remove-list", removeOldSavedList)
router.put("/modify-list", modifySavedList)

router.get("/get-result", getResumeResult)
router.delete("/delete-result", deleteResumeResult)

router.delete("/delete-unused", deleteUnusedFiles)





export default router;