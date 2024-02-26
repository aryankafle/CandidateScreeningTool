import express from "express";

import {
    uploadResumesToDB,
    updateFilters
} from "../controllers/MongoDB.controller.js"

const router = express.Router();



router.post("/uploadResumesToDB", uploadResumesToDB)
router.post("/updateFilters", updateFilters)

export default router;