import config from "./env.config.js"

export default {

    apiKey: config.OPENAI_API_KEY,
    
    model: "gpt-4o",
    tokenEncoding: "cl100k_base",
    
}

export const tokenLimits = {

    PER_MINUTE: 25000, // (exact 30000)
    MEMORY_PER_REQUEST: 8000,

    SCAN_TOKEN_LIMIT: 2000,

    MAX_TOKENS_RESPONSE: 500,
    
    defaults: {
    
        MESSAGE_TOKENS: 4, // As per docs at https://platform.openai.com/docs/guides/text-generation/managing-tokens
        REPLY_PADDING_TOKENS: 2 // As per docs at https://platform.openai.com/docs/guides/text-generation/managing-tokens
    
    }

}

export const scoring = {

    MAX_SCORE: 100,

    scoringGuidlinesObject: {

        "lowest posible score": 0,
        "highest possible score": 100,

        "0-20": "A score between 0 and 200 indicates almost no adherence to the filter criteria.",
        "20-40": "A score between 200 and 400 indicates slight adherence to the filter criteria.",
        "40-60": "A score between 400 and 600 indicates some adherence to the filter criteria.",
        "60-80": "A score between 600 and 800 indicates sufficient adherence to the filter criteria",
        "80-100": "A score between 800 and 1000 indicates perfect adherence to the filter criteria."


    }
    

}