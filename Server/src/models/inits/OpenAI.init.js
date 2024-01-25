import OpenAI from "openai"
import openaiConfig from "../../config/openai.config.js";

console.log(openaiConfig.openAI)

export const openAICllient = new OpenAI(openaiConfig.openAI);