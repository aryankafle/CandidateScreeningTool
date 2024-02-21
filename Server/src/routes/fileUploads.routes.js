import express from "express";

import {
    convertPdfToImg,
} from "../controllers/textscan.controller.js"

const router = express.Router();



router.post("/convert-pdf-to-img", convertPdfToImg)

export default router;