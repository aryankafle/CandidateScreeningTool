import express from "express";



import {
    applyFiltersToResumes,
    getResumeList,
} from "../controllers/ResumeFiltering.controller.js";

import { verifyUserOwnsList } from "../middlewares/authorization/VerifyUserOwnsList.js";
import { addFilteringLoadingState } from "../middlewares/CreateAndAddLoadingState.js";




const router = express.Router();



router.post("/apply-filters-to-resumes", addFilteringLoadingState, verifyUserOwnsList, applyFiltersToResumes)
router.get("/get-resume-list", verifyUserOwnsList, getResumeList)





export default router;