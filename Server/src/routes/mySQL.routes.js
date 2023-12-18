import express from "express";



// Import from controllers
import {
    testMySQLDatabaseConnection

} from "../controllers/MySQL.controller.js";



const router = express.Router();

// Controller routing
router.get("/test-database-connection", testMySQLDatabaseConnection)



export default router;