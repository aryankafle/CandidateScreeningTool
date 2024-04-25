import express from "express";



import {
    
    createResultsForResume

} from "../controllers/ResumeFiltering.controller.js";





const router = express.Router();



router.put("/apply-filters-to-resumes", createResultsForResume)





export default router;