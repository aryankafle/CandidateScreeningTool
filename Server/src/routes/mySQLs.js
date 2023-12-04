import express from "express";



// Import from controllers
import {
    queryDatabase

} from "../services/mySQL-db-cruds.js";



const router = express.Router();

// Controller routing
router.get("/query-database", queryDatabase)



export default router;