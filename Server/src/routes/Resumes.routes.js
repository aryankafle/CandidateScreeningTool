import express from "express";



import {

    addNewSavedList,
    removeOldSavedList,
    modifySavedList,

    getResumeResult,
    deleteResumeResult,
    modifyResumeResult,

} from "../controllers/Resumes.controller.js";

import {


    
} from "../controllers/Uploads.controller.js";







const router = express.Router();



router.post("/create-list", addNewSavedList)
router.put("/remove-list", removeOldSavedList)
router.put("/modify-list", modifySavedList)

router.get("/get-result", getResumeResult)
router.put("/delete-result", deleteResumeResult)





export default router;