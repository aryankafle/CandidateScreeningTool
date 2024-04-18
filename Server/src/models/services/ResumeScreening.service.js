import { makeAIRequest } from "../utils/OpenAIQueryBatching.js";
import OpenAI from "openai"
import openaiConfig from "../../config/openai.config.js";





export async function getFilterScoresForResume(resumeFile, filters) {

    const chatInstance = new OpenAI(openaiConfig.apiKey);


    

    const messages = []

    const scannedText = resumeFile.text;

    messages.push({
        role: "system",
        content: "You are an AI resume screening assistant that will help the user score and summarize information from the text-scan of a resume, based on the criteria outlined by the user. Score each criteria seperately; Scores should be representative of how well the resume text-scan fits the specific criteria. Be extremely strict, but accurate."
    })

    messages.push({
        role: "system",
        content: `The contents of the resume's text-scan are as follows: 
        <START_OF_RESUME_TEXT_SCAN> 
        ${scannedText}
        <END_OF_RESUME_TEXT_SCAN>
        `
    })

    messages.push({
        role: "system",
        content: 
        `
        Be sure to ONLY respond in the following JSON format:
        {
            name: <NAME_OF_APPLICANT>
            scores: [
                { filter: <CRITERIA_NAME>, score: <SCORE>, rationale: <BRIEF_RATIONALE> },
                { filter: <CRITERIA_NAME>, score: <SCORE>, rationale: <BRIEF_RATIONALE> },
                ...
                { filter: <CRITERIA_NAME>, score: <SCORE>, rationale: <BRIEF_RATIONALE> }
            ]
        }
        `
    })

    filters.forEach(filter => {
        
        messages.push({
            role: "user",
            content: filter.query
        })

    });

    const response = (await makeAIRequest(messages, chatInstance)).content

    const JSONParsedResponse = JSON.parse(response) 

    return JSONParsedResponse.scores

}



export async function getSectionSummariesForResume(resumeFile) {

    const chatInstance = new OpenAI(openaiConfig.apiKey);


    

    const messages = []

    const scannedText = resumeFile.text;

    messages.push({
        role: "system",
        content: "You are an AI resume summarizing assistant that will help the user summarize information from the text-scan of a resume. Partition this resume into sections and create a brief summary of the included information in each of your created sections."
    })

    messages.push({
        role: "system",
        content: `
                    There are default sections that you MUST include in your response:
                    1. "Skills"
                    2. "Experience"
                    If you cannot find information that pertains to one of these default sections, simply say that you were not able to find such information.
                    Still include more sections than just these two.
                    Do not make more than 10 sections in total.`
    })

    messages.push({
        role: "system",
        content: `The contents of the resume's text-scan are as follows: 
        <START_OF_RESUME_TEXT_SCAN> 
        ${scannedText}
        <END_OF_RESUME_TEXT_SCAN>
        `
    })

    messages.push({
        role: "system",
        content: 
        `
        Be sure to ONLY respond in the following JSON format:
        {
            summaries: {
                <SECTION_NAME>: <BRIEF_SUMMARY>,
                <SECTION_NAME>: <BRIEF_SUMMARY>,
                <SECTION_NAME>: <BRIEF_SUMMARY>,
                <SECTION_NAME>: <BRIEF_SUMMARY>,
                ...
                <SECTION_NAME>: <BRIEF_SUMMARY>,
            }
        }
        `
    })

    const response = (await makeAIRequest(messages, chatInstance)).content

    const JSONParsedResponse = JSON.parse(response) 

    return JSONParsedResponse.summaries

}



export async function getOverallSummaryForResume(resumeFile) {

    const chatInstance = new OpenAI(openaiConfig.apiKey);


    

    const messages = []

    const scannedText = resumeFile.text;

    messages.push({
        role: "system",
        content: "You are an AI resume summarizing assistant that will briefly summarize the following resume."
    })

    messages.push({
        role: "system",
        content: `Be sure to respond in paragraph format.`
    })

    messages.push({
        role: "system",
        content: `The contents of the resume's text-scan are as follows: 
        <START_OF_RESUME_TEXT_SCAN> 
        ${scannedText}
        <END_OF_RESUME_TEXT_SCAN>
        `
    })

    messages.push({
        role: "system",
        content: 
        `
        Be sure to ONLY respond in the following JSON format:
        { summary: <BRIEF_SUMMARY> }
        `
    })

    const response = (await makeAIRequest(messages, chatInstance)).content

    const JSONParsedResponse = JSON.parse(response) 

    return JSONParsedResponse.summary

}



export async function getCandidateNameFromResume (resumeFile) {

    const chatInstance = new OpenAI(openaiConfig.apiKey);


    

    const messages = []

    const scannedText = resumeFile.text;

    messages.push({
        role: "system",
        content: "You are a helpful AI assitant that will identify the name of the applicant in the following resume."
    })

    messages.push({
        role: "system",
        content: `The contents of the resume's text-scan are as follows: 
        <START_OF_RESUME_TEXT_SCAN> 
        ${scannedText}
        <END_OF_RESUME_TEXT_SCAN>
        `
    })

    messages.push({
        role: "system",
        content: 
        `
        Be sure to ONLY respond in the following JSON format:
        { 
            applicant: {
                name: <CANDIDATE_NAME>
            }
        }
        `
    })

    const response = (await makeAIRequest(messages, chatInstance)).content

    const JSONParsedResponse = JSON.parse(response) 

    return JSONParsedResponse.applicant

}