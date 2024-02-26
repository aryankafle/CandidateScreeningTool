import express from "express";



// Import from controllers
import {
    testMongoDatabaseConnection,
} from "../controllers/MongoDB.controller.js";



const router = express.Router();



router.get("/test-mongoDB-connection", testMongoDatabaseConnection)

export default router;