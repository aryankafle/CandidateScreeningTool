import { queryAI } from "./OpenAIQuery.service.js"

export const getResultsFromFilesWithFilters = async (fileArray, filterArray) => {
    
    async function getGPTResponse(file) {

        console.log(`------Getting response for file: ${file.fileName}.`)





        const scores = [];

        await Promise.all(

            filterArray.map(async (filter) => {

                const filterScore = await queryAI(
                    `
                        <START_OF_FILE_TEXT> 
                        ${file.text}
                        <END_OF_FILE_TEXT>
    
                        ${filter.query}
                    `
    
                    , `user`
                )

                scores.push({filter: filter, score: parseInt(filterScore.choices[0].message.content)})

            })

        )



        const sectionSummaries = await queryAI(
            `
                <START_OF_FILE_TEXT> 
                ${file.text}
                <END_OF_FILE_TEXT>

                Your task is to partition this above file into sections and create a brief summary of the included information in each of your created sections.
                
                ***

                There are a couple of sections you MUST include in this list of sections as listed below:
                1. "Contact Information"
                2. "Skills"
                3. "Experience"

                Other than those three, include any other sections that also partition the contents of the file nicely.

                ***

                You must format your response in a specific way. Respond in a JSON format, with the section titles listed as keys and their respective summaries as values.
                Make absolutely sure that each key, value pair matches correctly.
                Completely adhere to this format, do not respond with any other text than this JSON.
            `

            , `user`
        )

        
        const overallSummary = await queryAI(
            `
                <START_OF_FILE_TEXT> 
                ${file.text}
                <END_OF_FILE_TEXT>

                Summarize the following file's content in paragraph form. Be brief but accurate.
                Prioritize accuracy, you MUST not provide an incorrect summary.
            `

            , `user`
        )

        const summaries = JSON.parse(sectionSummaries.choices[0].message.content)

        const name = await queryAI(
            `
                <START_OF_FILE_TEXT> 
                ${file.text}
                <END_OF_FILE_TEXT>
                If the above file is a resume, find the name of the person who wrote it. If not, find the author. Respond ONLY with the FIRST and LAST name of the person who wrote it or author. If you cannot find either, respond with "nouser". Do NOT respond with any other text than this.
            `

            , `user`
        )



        const response = {
            scores,
            summaries,
            summary: overallSummary.choices[0].message.content,
            applicant: {
                name: name.choices[0].message.content,
                
            }
        }





        console.log(`------Got GPT Response: ${response}`)

        return response
        
    }



    const openAiResponseArr = await Promise.all(fileArray.map(async (file) => {

        var GPTResponse = await getGPTResponse(file)

        if(!GPTResponse) {
            return {
                error: `Error getting GPT Response: ${error}`,
                fileName: file.fileName
            }
        }

        return {
            ...GPTResponse,
            filters: [...filterArray],
            fileName: file.fileName
        }

    }))



    

    return openAiResponseArr;

}