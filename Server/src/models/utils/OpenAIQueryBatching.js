import { tokenLimits } from "../../config/openai.config.js";
import { makeChatGPTRequest } from "./OpenAIQuery.service.js";
import { getNumTokensFromRequest } from './OpenAIQueryHelpers.js';





const queryStack = []



let tokensRemainingThisMinute = tokenLimits.PER_MINUTE

function resetTokenPerMinuteLimit() {


    console.log("Refreshing Token Limit... ")

    tokensRemainingThisMinute = tokenLimits.PER_MINUTE

    console.log(`OpenAI Tokens-Per-Minute Limit Refreshed. Tokens Remaining: ${tokensRemainingThisMinute}`)

}

setInterval(resetTokenPerMinuteLimit, 1000*60) // Reset tokens every minute





async function getQueryResponse (query) {

    const index = queryStack.indexOf(query)

    if(index === -1) throw new Error("Query not added to the OpenAI request stack!")

    const response = await removeQueryFromStack(index)

    return response

}

async function removeQueryFromStack(index) {

    return new Promise((resolve, reject) => {

        while(queryStack.length !== index + 1) continue

        const query = queryStack[index]

        while(tokensRemainingThisMinute <= query.numTokens) continue;

        tokensRemainingThisMinute -= query.numTokens

        console.log(
            `
            Requesting OpenAI...
            Request Index: ${index};
            `
        )

        makeChatGPTRequest(query.messages, query.chatInstance).then(
            (GPTResponse) => {

                queryStack.pop()

                tokensRemainingThisMinute += query.numTokens
                tokensRemainingThisMinute -= GPTResponse.totalTokensUsed

                console.log(`Request Complete. Tokens Used: ${query.numTokens}; Tokens Remaining: ${tokensRemainingThisMinute}`)

                resolve(GPTResponse)
            
            },
            (rejectReason) => {
            
                queryStack.pop()
                reject(rejectReason)
            
            }
        )

    })

}



export function makeAIRequest (messages, chatInstance) {

    const numTokens = getNumTokensFromRequest(messages)

    const query = {

        messages,
        numTokens,
        chatInstance
    
    }

    queryStack.push(query)

    return getQueryResponse(query)

}