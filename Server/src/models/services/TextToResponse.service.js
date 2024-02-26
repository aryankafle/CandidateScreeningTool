import { openAICllient } from "../../inits/OpenAI.init.js"
import { queryAI } from "./OpenAIQuery.service.js"
import openaiConfig from "../../config/openai.config.js"
import { query } from "express";

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

        const summary = await queryAI(
            `
                <START_OF_FILE_TEXT> 
                ${file.text}
                <END_OF_FILE_TEXT>
                Summarize each section of the above file.
            `

            , `user`
        )

        const name = await queryAI(
            `
                <START_OF_FILE_TEXT> 
                ${file.text}
                <END_OF_FILE_TEXT>
                If the above file is a resume, find the name of the person who wrote it. If not, find the author. Respond only with the first and last name of the person who wrote it or author. If you cannot find either, respond with "nouser".
            `

            , `user`
        )

        return {
            scores: filterScores,
            summary: summary.choices[0].message.content,
            name: name
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
            ...GPTResponse,
            filters: [...fileArray[fileIndex].filters],
            file: fileArray[fileIndex]
        })
    }



    return openAiResponseArr;

}