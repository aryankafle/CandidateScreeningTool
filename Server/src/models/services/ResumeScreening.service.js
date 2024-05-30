import OpenAI from "openai";
import openaiConfig, { scoring } from "../../config/openai.config.js";
import { retryAIRequestUntilRateLimitAllows } from "../utils/OpenAIQueryBatching.js";





export async function getFilterScoresForResume(imageMessage, filters, imageWidth, imageHeight) {

    const chatInstance = new OpenAI(openaiConfig.apiKey);





    const messages = []

    messages.push({
        role: "system",
        content: `You are a helpful AI assistant that will score a resume based on the user's inputted filter criteria.`
    })

    messages.push(imageMessage)

    messages.push({
        role: "system",
        content: `Scoring guidelines: ${JSON.stringify(scoring.scoringGuidlinesObject)}`
    })

    messages.push({
        role: "system",
        content: `Be extremely accurate in your scoring. Score ALL filter criteria!`
    })

    messages.push({
        role: "system",
        content: `Respond in the following JSON format: {scores: [{filter: <CRITERIA_NAME>, value: <SCORE>, rationale: <BRIEF_RATIONALE>}, {filter: <CRITERIA_NAME>, value: <SCORE>, rationale: <BRIEF_RATIONALE>}, ... {filter: <CRITERIA_NAME>, value: <SCORE>, rationale: <BRIEF_RATIONALE>}]}`
    })



    for(const filter of filters) {

        messages.push({
            role: "user",
            content: `{filter: ${filter.name}, criteria: ${filter.query}}`
        })

    }

    const response = await retryAIRequestUntilRateLimitAllows(messages, chatInstance, imageWidth, imageHeight)

    const JSONParsedResponse = JSON.parse(response)

    JSONParsedResponse.scores.sort((
        (scoreA, scoreB) => scoreB.value - scoreA.value
    ))

    return JSONParsedResponse.scores

}



export async function getSectionSummariesForResume(imageMessage, imageWidth, imageHeight) {

    const chatInstance = new OpenAI(openaiConfig.apiKey);



    

    const messages = []

    messages.push({
        role: "system",
        content: "You are a helpful AI assistant that wil create brief section summaries for the contents of a resume."
    })

    messages.push(imageMessage)

    messages.push({
        role: "system",
        content: `Do not include a section for contact information. Section names may not exceed two words. Section names should be in all-caps. Summaries may not exceed 1 paragraph.`
    })



    messages.push({
        role: "system",
        content: 
        `Respond in the following JSON format, storing your responses in the "summaries" array. { summaries: [ { section: <SECTION_NAME>, summary: <BRIEF_SUMMARY> }, { section: <SECTION_NAME>, summary: <BRIEF_SUMMARY> }, { section: <SECTION_NAME>, summary: <BRIEF_SUMMARY> }, { section: <SECTION_NAME>, summary: <BRIEF_SUMMARY> } ... { section: <SECTION_NAME>, summary: <BRIEF_SUMMARY> } ] }`
    })



    const response = await retryAIRequestUntilRateLimitAllows(messages, chatInstance, imageWidth, imageHeight)

    var JSONParsedResponse = JSON.parse(response) 

    return JSONParsedResponse.summaries

}



export async function getOverallSummaryForResume(imageMessage, imageWidth, imageHeight) {

    const chatInstance = new OpenAI(openaiConfig.apiKey);


    


    const messages = []

    messages.push({
        role: "system",
        content: "You are a helpful AI resume summarizing assistant that will help the user briefly summarize the contents of a resume."
    })

    messages.push(imageMessage)

    messages.push({
        role: "system",
        content: `Your summaries should not exceed two short paragraphs.`
    })



    messages.push({
        role: "system",
        content: 
        `Respond in the following JSON format: {summary: <BRIEF_SUMMARY>}`
    })

    const response = await retryAIRequestUntilRateLimitAllows(messages, chatInstance, imageWidth, imageHeight)

    const JSONParsedResponse = JSON.parse(response) 

    return JSONParsedResponse.summary

}



export async function getApplicantFromResume (imageMessage, imageWidth, imageHeight) {

    const chatInstance = new OpenAI(openaiConfig.apiKey);


    

    
    const messages = []

    messages.push({
        role: "system",
        content: "You are a helpful AI assitant that will help the user identify the author of a document."
    })

    messages.push(imageMessage)

    messages.push({
        role: "system",
        content: 
        `If you are certain you cannot find a name, simply populate the neccesary field with the string "Name Not Found". Respond in the following JSON format: {applicant: {name: <CANDIDATE_NAME>}}`
    })

    const response = await retryAIRequestUntilRateLimitAllows(messages, chatInstance, imageWidth, imageHeight)

    const JSONParsedResponse = JSON.parse(response) 

    return JSONParsedResponse.applicant

}