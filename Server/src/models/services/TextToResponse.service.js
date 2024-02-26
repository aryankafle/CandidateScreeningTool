import { openAICllient } from "../../inits/OpenAI.init.js"
import { queryAI } from "./OpenAIQuery.service.js"
import openaiConfig from "../../config/openai.config.js"

export const getResultsFromFilesWithFilters = async (fileArray) => {

    const openAiResponseArr = [];



    async function getGPTResponse(file, filters) {

        const filterScores = [];

        console.log("88989423,", filters)

        for(var filterIndex = 0; filterIndex < filters.length; filterIndex++) {

            const filterScore = await queryAI(
                `
                    <START_OF_FILE_TEXT> 
                    ${file.text}
                    <END_OF_FILE_TEXT>

                    ${filters[filterIndex].query}
                `

                , `user`
            )

            filterScores.push({filter: filters[filterIndex], score: filterScore.choices[0].message.content})
            
        }



        return {
            scores: filterScores,
            summary: await queryAI(
                `
                    <START_OF_FILE_TEXT> 
                    ${file.text}
                    <END_OF_FILE_TEXT>
                    Summarize each section of the above file.
                `

                , `user`)
        }
        
    }

    for (var fileIndex = 0; fileIndex < fileArray.length; fileIndex++){

        var GPTResponse;

        try {
            GPTResponse = await getGPTResponse(fileArray[fileIndex].scannedResume, fileArray[fileIndex].filters)
        }
        catch(error) {
            console.log(`service: async getResultsFromFilesWithFilters(), error: ${error}`)
        }



        if(!GPTResponse) {
            
            openAiResponseArr.push({
                error: "Error getting GPT Response.",
                fileName: fileArray[fileIndex].fileName
            })
            
            continue;
        }

        openAiResponseArr.push({
            text: GPTResponse,
            fileName: fileArray[fileIndex].fileName
        })
    }



    return openAiResponseArr;

}