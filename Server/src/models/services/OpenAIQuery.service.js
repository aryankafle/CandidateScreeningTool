import {openAICllient} from "../../inits/OpenAI.init.js"
import openaiConfig from "../../config/openai.config.js"

export async function makeChatGPTRequest (messages) {

    const GPTResponse = await openAICllient.chat.completions.create({
        messages,
        model: openaiConfig.model
    })

    const response = {

        content: GPTResponse.choices[0].message.content || "No Content.",
        role: GPTResponse.choices[0].message.role
    
    }

    return response

}