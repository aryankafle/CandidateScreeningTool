import { queryAI } from "./OpenAIQuery.service.js"

export const getResultsFromFilesWithFilters = async (fileArray) => {
    
    async function getGPTResponse(file, filters) {

        console.log(`------Getting response for file: ${file.fileName}.`)





        const filterScores = [];

        for(var filterIndex = 0; filterIndex < filters.length; filterIndex++) {
                //ask chat gpt to do more than 1 query at the same time
                //yada yada concurrent quieres
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



        const response = {
            scores: filterScores,
            summary: summary.choices[0].message.content,
            name: name.choices[0].message.content,
        }





        console.log(`------Got GPT Response: ${response}`)

        return response
        
    }



    const openAiResponseArr = [];

    for (var fileIndex = 0; fileIndex < fileArray.length; fileIndex++){

        var GPTResponse = await getGPTResponse(fileArray[fileIndex].scannedResume, fileArray[fileIndex].filters)





        if(!GPTResponse) {
            
            openAiResponseArr.push({
                error: `Error getting GPT Response: ${error}`,
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