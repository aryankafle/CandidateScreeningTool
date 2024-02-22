import {openAICllient} from "../../inits/OpenAI.init.js"
import openaiConfig from "../../config/openai.config.js"

export const queryAI = async (fileArray, filterArray) => {
    var openAiResponseArr = []
    const query = openaiConfig.query
    query.messages.pop();
    for (i = 0; i < fileArray.length; i++){
        const newQuery = {
            role: "user",
            content: "Given this filter" + filterArray[0] + ", Summarize this file" + fileArray[i].text
        }
        query.messages.push(newQuery)
        try {
            const GPTResponse = await openAICllient.chat.completions.create(query)
            const fullResponse = {
                text: GPTResponse,
                fileName: fileArray[i].fileName
            }
            openAiResponseArr.push(fullResponse)
        }
        catch (err) {
            console.log(`OpenAI Service - queryAI Error: Creating GPTReponse resulted in error: ${err}`)
            const fullResponse = {
                text: `OpenAI Service - queryAI Error: Creating GPTReponse resulted in error: ${err}`,
                fileName: fileArray[i].fileName
            }
            openAiResponseArr.push(fullResponse)
        }
    }
    return openAiResponseArr;

}