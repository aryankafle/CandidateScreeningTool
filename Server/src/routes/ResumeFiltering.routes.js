import express from "express";



import {
    applyFiltersToResumes,
    getResumeList,
} from "../controllers/ResumeFiltering.controller.js";

import { verifyUserOwnsList } from "../middlewares/VerifyUserOwnsList.js";





const router = express.Router();



router.post("/applyFiltersToResumes", verifyUserOwnsList, applyFiltersToResumes)
router.get("/getResumeList", verifyUserOwnsList, getResumeList)





export default router;