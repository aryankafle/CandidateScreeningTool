import express from "express";



// Import from controllers
import {
    connectDatabase

} from "../models/services/MySQL.service.js";



const router = express.Router();

// Controller routing
router.get("/query-database", connectDatabase)



export default router;