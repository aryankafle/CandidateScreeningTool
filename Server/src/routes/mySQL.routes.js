import express from "express";



// Import from controllers
import {
    testDatabaseConnection

} from "../controllers/mySQL.controller.js";



const router = express.Router();

// Controller routing
router.get("/test-database-connection", testDatabaseConnection)



export default router;