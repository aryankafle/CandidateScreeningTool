import openaiConfig from "../../config/openai.config.js"

export async function makeChatGPTRequest (messages, chatInstance) {

    const GPTResponse = await chatInstance.chat.completions.create({
        messages,
        model: openaiConfig.model,
        response_format: { type: "json_object" }
    })

    const response = {

        content: GPTResponse.choices[0].message.content || "No Content.",
        role: GPTResponse.choices[0].message.role,
        totalTokensUsed: GPTResponse.usage.total_tokens
    
    }

    return response

}