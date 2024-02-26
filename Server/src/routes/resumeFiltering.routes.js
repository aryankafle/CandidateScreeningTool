import express from "express";



import {
    applyFiltersToResumes,
    getResumeList,
} from "../controllers/ResumeFiltering.controller.js";

import { verifyMongoDbConnection } from "../middlewares/VerifyMongoConnection.js";



const router = express.Router();



router.post("/applyFiltersToResumes", verifyMongoDbConnection, applyFiltersToResumes)
router.get("/getResumeList", verifyMongoDbConnection, getResumeList)

export default router;