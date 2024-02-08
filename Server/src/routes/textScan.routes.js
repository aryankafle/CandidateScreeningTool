import express from "express";

import {
    convertPdfToImg ,
    //scantext
} from "../controllers/textscan.controller.js"

const router = express.Router();

router.get("/convert-pdf-to-img", convertPdfToImg)
//router.get("/ScanText", scantext)

export default router;