import config from "./env.config.js"

export default {

    apiKey: config.OPENAI_API_KEY,
    
    model: "gpt-3.5-turbo",
    tokenEncoding: "cl100k_base",
    
}

export const tokenLimits = {

    PER_MINUTE: 59000, // (exact 60000)
    MEMORY_PER_REQUEST: 4000, // (exact 4096)
    
    defaults: {
    
        MESSAGE_TOKENS: 4, // As per docs at https://platform.openai.com/docs/guides/text-generation/managing-tokens
        REPLY_PADDING_TOKENS: 2 // As per docs at https://platform.openai.com/docs/guides/text-generation/managing-tokens
    
    }

}