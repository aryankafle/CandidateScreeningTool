import express from "express";

import {
    convertPdfToImg 
} from "../controllers/textscan.controller.js"

const router = express.Router();

router.use(convertPdfToImg)

export default router;