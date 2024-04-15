import { tokenLimits } from "../../config/openai.config.js"
import { getNumTokensFromRequest } from '../utils/OpenAIQueryHelpers.js';
import { makeChatGPTRequest } from "./OpenAIQuery.service.js";





const queryStack = []



let tokensRemainingThisMinute = tokenLimits.PER_MINUTE

function resetTokenPerMinuteLimit() {

    tokensRemainingThisMinute = tokenLimits.PER_MINUTE

}

setInterval(resetTokenPerMinuteLimit, 1000*60) // Reset tokens every minute





async function getQueryResponse (query) {

    const index = queryStack.findIndex(query)

    if(index === -1) throw new Error("Query not added to the OpenAI request stack!")

    const response = await removeQueryFromStack(index)

    return response

}

async function removeQueryFromStack(index) {

    return new Promise<AIMessage>((resolve, reject) => {

        while(queryStack.length !== index + 1) continue

        const query = queryStack[index]

        while(tokensRemainingThisMinute <= query.numTokens) continue;

        tokensRemainingThisMinute -= query.numTokens

        makeChatGPTRequest(query.messages).then(
            (GPTResponse) => {

                queryStack.pop()
                resolve(GPTResponse)
            
            },
            (rejectReason) => {
            
                queryStack.pop()
                reject(rejectReason)
            
            }
        )

    })

}



export async function makeAIRequest (messages) {

    let numTokens = getNumTokensFromRequest(messages)

    try {
        
        numTokens = getNumTokensFromRequest(messages)
    
    }
    catch (error) {
        
        return {
            role: "MAX TOKENS EXCEEDED",
            content: "MAX TOKENS EXCEEDED"
        }

    }

    const query = {

        messages,
        numTokens
    
    }

    queryStack.push(query)

    return await getQueryResponse(query)

}