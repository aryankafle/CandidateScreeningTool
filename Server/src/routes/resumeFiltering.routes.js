import express from "express";



import {
    applyFiltersToResumes,
    getResumeList,
} from "../controllers/MongoDB.controller.js";



const router = express.Router();



router.post("/applyFiltersToResumes", applyFiltersToResumes)
router.get("/getResumeList", getResumeList)

export default router;