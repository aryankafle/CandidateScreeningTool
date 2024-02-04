import express from "express";



// Import from controllers
import {
    testMongoDatabaseConnection,
    viewCommentsTable

} from "../controllers/MongoDB.controller.js";



const router = express.Router();

// Controller routing
router.get("/test-mongoDB-connection", testMongoDatabaseConnection)
router.get("/test-table-query", viewCommentsTable)



export default router;