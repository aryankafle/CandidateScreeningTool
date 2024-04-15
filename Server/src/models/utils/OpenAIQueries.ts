import { getEncoding, encodingForModel } from "js-tiktoken"
import openaiConfig from "../../config/openai.config"



export const TOKENS_PER_MINUTE = 1000
export const TOKENS_PER_REQUEST = 1000
const TOKEN_PADDING = 10



const enc = getEncoding(openaiConfig.tokenEncoding)

export function getTokens(messages : AIMessage[]) {
    
    let totalTokens = 0

    for(let i = 0; i < messages.length; i++) {
        
        totalTokens += TOKEN_PADDING

        const contentEncoding = enc.encode(messages[i].content)
        const roleEncoding = enc.encode(messages[i].role)

        totalTokens += contentEncoding.length
        totalTokens += roleEncoding.length

    }
}

type AIMessage = {
    content: ""
    role: ""
}

type AIQuery = {
    messages: AIMessage[]
    numTokens: number
}

const queryStack : AIQuery[] = []

