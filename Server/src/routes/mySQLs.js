import express from "express";



// Import from controllers
import {
    queryDatabase

} from "../controllers/mySQL.js";



const router = express.Router();

// Controller routing
router.get("/query-database", queryDatabase)