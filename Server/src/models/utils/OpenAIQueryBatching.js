import { tokenLimits } from "../../config/openai.config.js";
import { makeChatGPTRequest } from "./OpenAIQuery.service.js";
import { getNumTokensFromRequest } from './OpenAIQueryHelpers.js';





let tokensRemainingThisMinute = tokenLimits.PER_MINUTE

function resetTokenPerMinuteLimit() {


    console.log("Refreshing Token Limit... ")

    tokensRemainingThisMinute = tokenLimits.PER_MINUTE

    console.log(`OpenAI Tokens-Per-Minute Limit Refreshed. Tokens Remaining: ${tokensRemainingThisMinute}`)

}

setInterval(resetTokenPerMinuteLimit, 1000*60) // Reset tokens every minute





function wait(ms) {

    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
    
}

export async function retryAIRequestUntilRateLimitAllows(messages, chatInstance, imageWidth, imageHeight) {

    try {

        const response = ( await makeAIRequest(messages, chatInstance, imageWidth, imageHeight) ).content
        
        return response

    } catch (error) {

        await wait(1000*60);
        
        return await retryAIRequestUntilRateLimitAllows(messages, chatInstance, imageWidth, imageHeight);

    }
}



async function makeAIRequest (messages, chatInstance, imageWidth, imageHeight) {

    const numTokens = getNumTokensFromRequest(messages, imageWidth, imageHeight)

    const tokensToUse = numTokens + tokenLimits.MAX_TOKENS_RESPONSE
    
    tokensRemainingThisMinute -= tokensToUse

    console.log(`AI Requested. Tokens Used: ${numTokens}; Tokens Remaining: ${tokensRemainingThisMinute}`)

    const GPTResponse = await makeChatGPTRequest(messages, chatInstance)

    tokensRemainingThisMinute += (tokenLimits.MAX_TOKENS_RESPONSE - GPTResponse.totalTokensUsed)

    console.log(`AI Response Generated. Tokens Used: ${numTokens}; Tokens Remaining: ${tokensRemainingThisMinute}`)

    return GPTResponse

}