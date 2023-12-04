import express from "express";

import {
    askQuestion

} from "../controllers/openai.js";

import {
    verifyOpenAIReqeust

} from "../middlewares/input-verifications.js"

const router = express.Router();

router.use(verifyOpenAIReqeust);
router.get("/ask-question", askQuestion)