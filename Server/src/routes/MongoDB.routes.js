import express from "express";



// Import from controllers
import {
    testMongoDatabaseConnection,
    uploadResumesToDB,
    applyFiltersToResumes,
    getResumeList,
    updateFilters
} from "../controllers/MongoDB.controller.js";



const router = express.Router();

// Controller routing
router.get("/test-mongoDB-connection", testMongoDatabaseConnection)
router.post("/uploadResumesToDB", uploadResumesToDB)
router.post("/applyFiltersToResumes", applyFiltersToResumes)
router.get("/getResumeList", getResumeList)
router.post("/updateFilters", updateFilters)



export default router;