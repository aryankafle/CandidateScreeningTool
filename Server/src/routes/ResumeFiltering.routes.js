import express from "express";



import {
    applyFiltersToResumes,
    getResumeList,
} from "../controllers/ResumeFiltering.controller.js";

import { verifyUserOwnsList } from "../middlewares/authorization/VerifyUserOwnsList.js";





const router = express.Router();



router.post("/apply-filters-to-resumes", verifyUserOwnsList, applyFiltersToResumes)
router.get("/get-resume-list", verifyUserOwnsList, getResumeList)





export default router;