import express from "express";



// Import from controllers
import {
    testMongoDatabaseConnection

} from "../controllers/MongoDB.controller.js";



const router = express.Router();

// Controller routing
router.get("/test-database-connection", testMongoDatabaseConnection)



export default router;