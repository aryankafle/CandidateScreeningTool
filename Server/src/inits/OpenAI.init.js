import OpenAI from "openai"
import openaiConfig from "../config/openai.config.js";



export const openAICllient = new OpenAI(openaiConfig.openAI);