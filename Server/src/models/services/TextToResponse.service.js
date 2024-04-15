import { makeAIRequest } from "./OpenAIQueryBatching.js"





export async function getResumeScore(file, filter) {

    const filterScore = await makeAIRequest(
        [
            {
                content: `
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
                `,
                role: `user`
            }
        ]
    )

    const json = JSON.parse(filterScore.content)



    return { filter: filter, score: json.score, rationale: json.rationale }
    
}



export async function getResumeSummaries(file) {

    const sectionSummaries = await makeAIRequest(
        [
            {
                content: `
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
                `,
                role: `user`
            }
        ]
    )



    return JSON.parse(sectionSummaries.content)

}



export async function getResumeOverallSummary(file) {

    const overallSummary = await makeAIRequest(
        [
            {
                content: `
                    <START_OF_FILE_TEXT> 
                    ${file.text}
                    <END_OF_FILE_TEXT>

                    Summarize the following file's content in paragraph form. Be brief but accurate.
                    Prioritize accuracy, you MUST not provide an incorrect summary.
                `,

                role: `user`
            }
        ]
    )



    return overallSummary.content

}



export async function getResumeApplicant(file) {

    const name = await makeAIRequest(
        [
            {
                content: `
                    <START_OF_FILE_TEXT> 
                    ${file.text}
                    <END_OF_FILE_TEXT>
                    If the above file is a resume, find the name of the person who wrote it. If not, find the author. Respond ONLY with the FIRST and LAST name of the person who wrote it or author. If you cannot find either, respond with "nouser". Do NOT respond with any other text than this.
                `,

                role: `user`
            }
        ]
    )



    return {
        name: name.content
    }

}
