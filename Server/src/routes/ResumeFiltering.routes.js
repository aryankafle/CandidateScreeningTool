import express from "express";



import {
    
    createResultsForResume

} from "../controllers/ResumeFiltering.controller.js";





const router = express.Router();



router.put("/create-resume-result", createResultsForResume)





export default router;