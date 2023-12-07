import {openAICllient} from "../inits/OpenAI.init.js"
import openaiConfig from "../../config/openai.config.js"

export const queryAI = async (message, role) => {
    const query = openaiConfig.query
    query.messages.pop();
    
    const newQuery = {
        role: role,
        content: message
    }

    query.messages.push(newQuery)

    try {
        const GPTResponse = await openAICllient.chat.completions.create(query)

        return GPTResponse 
    }
    catch (err) {
        console.log(`OpenAI Service - queryAI Error: Creating GPTReponse resulted in error: ${err}`)
        
        return null;
    }
}