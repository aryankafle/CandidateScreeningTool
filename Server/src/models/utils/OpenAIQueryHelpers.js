import Queue from "bull";
import { encodingForModel } from "js-tiktoken";
import { tokenLimits } from "../../config/openai.config.js";





let currentTokensUsage = 0;
const TOKEN_LIMIT = tokenLimits.PER_MINUTE

let requestQueue = new Queue("aiRequestQueue")



requestQueue.process(async (job) => {

    const { messages, numTokens } = job.data

    if(currentTokensUsage + tokens > TOKEN_LIMIT) {



    }

})

async function addJob(message, numTokens) {

    await requestQueue.add('makeAIRequest', { message, numTokens } )

}


requestQueue.process('makeAIRequest', async (job) => {

    const { message, numTokens } = job.data

    if(TOKEN_LIMIT - currentTokensUsage <= numTokens) {



    }
    
})





function resize(width, height) {

    if(width === 0 && height === 0) return {width: 0, height: 0}

    if (width > 1024 || height > 1024) {
        if (width > height) {
            height = Math.floor(height * 1024 / width);
            width = 1024;
        } else {
            width = Math.floor(width * 1024 / height);
            height = 1024;
        }
    }
    return { width, height };
}

function countImageTokens(width, height) {

    const resized = resize(width, height);
    width = resized.width;
    height = resized.height;
    const h = Math.ceil(height / 512);
    const w = Math.ceil(width / 512);
    const total = 85 + 170 * h * w;
    return total;
    
}



const enc = encodingForModel("gpt-4-turbo-2024-04-09")




export function getNumTokensFromRequest(messages, imageWidth, imageHeight) {
    
    let totalTokens = 0

    for(let i = 0; i < messages.length; i++) {
        
        totalTokens += tokenLimits.defaults.MESSAGE_TOKENS

        if(messages[i].content[1].image_url) {

            const tokensToAdd = countImageTokens(imageWidth, imageHeight) * messages[i].content.length - 1

            totalTokens += tokensToAdd
            continue;

        };

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