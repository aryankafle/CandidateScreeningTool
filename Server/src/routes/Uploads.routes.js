import express from "express";

import {
    uploadResumesToDB,
    updateFilters
} from "../controllers/Uploads.controller.js"

import { verifyUserOwnsList } from "../middlewares/VerifyUserOwnsList.js";





const router = express.Router();



router.post("/uploadResumesToDB", uploadResumesToDB)
router.post("/updateFilters", verifyUserOwnsList, updateFilters)





export default router;