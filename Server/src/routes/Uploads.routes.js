import express from "express";

import {
    uploadResumesToDB,
    updateFilters
} from "../controllers/Uploads.controller.js"

import { verifyMongoDbConnection } from "../middlewares/VerifyMongoConnection.js";





const router = express.Router();



router.post("/uploadResumesToDB", verifyMongoDbConnection, uploadResumesToDB)
router.post("/updateFilters", verifyMongoDbConnection, updateFilters)





export default router;