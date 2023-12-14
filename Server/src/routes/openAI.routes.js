import express from "express";



// Import from controllers
import {
    askQuestion

} from "../controllers/OpenAI.controller.js";

// Import from middlewares
import {
    verifyOpenAIReqeust

} from "../middlewares/InputVerifications.middleware.js"



const router = express.Router();

// Pre-controller middlewares
router.use(verifyOpenAIReqeust);

// Controller routing
router.get("/ask-question", askQuestion)



export default router;