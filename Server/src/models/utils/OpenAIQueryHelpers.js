import { encodingForModel } from "js-tiktoken"
import openaiConfig, { tokenLimits } from "../../config/openai.config.js"





const enc = encodingForModel(openaiConfig.model)



export function getNumTokensFromRequest(messages) {
    
    let totalTokens = 0

    for(let i = 0; i < messages.length; i++) {
        
        totalTokens += tokenLimits.defaults.MESSAGE_TOKENS

        const contentEncoding = enc.encode(messages[i].content)
        const roleEncoding = enc.encode(messages[i].role)

        totalTokens += contentEncoding.length
        totalTokens += roleEncoding.length

    }

    totalTokens += tokenLimits.defaults.REPLY_PADDING_TOKENS



    if(totalTokens >= tokenLimits.MEMORY_PER_REQUEST) {
        
        throw new Error(`Open AI request uses ${totalTokens} tokens, which exceeds the maximum AI token memory of ${tokenLimits.MEMORY_PER_REQUEST}! Please shorten the request query!`)

    }

    return totalTokens

}



export function getNumTokensFromString(string) {

    return getNumTokensFromRequest([
        {role: "system", content: "this is a system prompt."},
        {role: "user", content: string}
    ])

}