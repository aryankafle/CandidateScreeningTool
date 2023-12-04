import express from "express";



// Import from controllers
import {
    askQuestion

} from "../controllers/openAI.js";

// Import from middlewares
import {
    verifyOpenAIReqeust

} from "../middlewares/input-verifications.js"



const router = express.Router();

// Pre-controller middlewares
router.use(verifyOpenAIReqeust);

// Controller routing
router.get("/ask-question", askQuestion)