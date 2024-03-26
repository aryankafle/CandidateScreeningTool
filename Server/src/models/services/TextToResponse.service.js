import { queryAI } from "./OpenAIQuery.service.js"

export const getResultsFromFilesWithFilters = async (fileArray, filterArray) => {
    
    async function getGPTResponse(file) {

        console.log(`------Getting response for file: ${file.fileName}.`)





        const scores = [];

        for(let i = 0; i < filterArray.length; i++) {

            const filter = filterArray[i]

            const filterScore = await queryAI(
                `
                    You will score the text contents of the file at the end of this prompt based on a filter statement.
                    You will also provide a brief, 1-2 sentence rationale explaining your method of scoring.
                    The filter statement will describe what criteria a file "should" abide by, as well as the possible ranges of scores for this particular filter.
                    Your score needs to measure how well this file's text abides to the criteria outlined in the filter.
                    Give resumes that do not, or barely, abide by the filter's criteria lower scores.
                    Give resumes that abide by the filter's criteria higher scores.

                    The filter statement for this file is: "${filter.query}"



                    It is important to be strict and accurate. Do not assume that an applicant's resume abides by a filter unless you have clear evidence to believe so.
                    If you have very convincing evidence that the file abides by a filter, give it a good score.
                    Additionally, if the file does not clearly outline a resume, or a majority of it is gibberish or otherwise unintelligble, disregard the filter and give it a score of 0.
                    
                    The textual content of the file you will be scoring is given below:

                    <START_OF_FILE_TEXT> 
                    ${file.text}
                    <END_OF_FILE_TEXT>

                    Format your response in the following JSON format:

                    {
                        "score": <SCORE>,
                        "rationale": <RATIONALE>
                    }

                    Do not put quotes around the score when inserting it into the JSON format, it should not parse as a string.
                `

                , `user`
            )

            const json = JSON.parse(filterScore.choices[0].message.content)

            scores.push({filter: filter, score: json.score, rationale: json.rationale })

        }


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



    let openAiResponseArr = [];

    for(let i = 0; i < fileArray.length; i++) {
        
        const file = fileArray[i]

        var GPTResponse = await getGPTResponse(file)

        if(!GPTResponse) {
            openAiResponseArr.push( {
                error: `Error getting GPT Response: ${error}`,
                fileName: file.fileName
            } )
        }
    
        openAiResponseArr.push( {
            ...GPTResponse,
            filters: [...filterArray],
            fileName: file.fileName
        } )

    };







    

    return openAiResponseArr;

}