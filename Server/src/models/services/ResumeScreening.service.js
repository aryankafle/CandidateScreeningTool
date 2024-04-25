import { makeAIRequest } from "../utils/OpenAIQueryBatching.js";
import OpenAI from "openai"
import openaiConfig from "../../config/openai.config.js";





export async function getQueryAboutResume(scannedText, query, scores) {

    const chatInstance = new OpenAI(openaiConfig.apiKey);


    


    const messages = []

    messages.push({
        role: "system",
        content: "You are an AI resume screening assistant that has previously scored a resume. The user will ask you questions about the resume and the scores you provided."
    })

    messages.push({
        role: "system",
        content: `The contents of the resume's text-scan were as follows: 
        <START_OF_RESUME_TEXT_SCAN> 
        ${scannedText}
        <END_OF_RESUME_TEXT_SCAN>
        `
    })

    messages.push({
        role: "system",
        content: `The scores that you previously provided this resume are listed below: 
        <START_OF_SCORES> 
        ${JSON.stringify(scores)}
        <END_OF_SCORES>
        `
    })

    messages.push({
        role: "user",
        content: query
    })

    messages.push({
        role: "system",
        content: 
        `
        Be sure to ONLY respond in the following JSON format:
        {
            response: <YOUR_RESPONSE>
        }
        `
    })

    const response = (await makeAIRequest(messages, chatInstance)).content

    const JSONParsedResponse = JSON.parse(response) 

    return JSONParsedResponse.response    

}



export async function resummarizeResumeOverall(scannedText, previousSummary, summaryQuery = undefined) {

    const chatInstance = new OpenAI(openaiConfig.apiKey);


    


    const messages = []

    messages.push({
        role: "system",
        content: "You are an AI resume screening assistant that previously attempted to assist the user in briefly summarizing the contents of a resume."
    })

    messages.push({
        role: "system",
        content: `The contents of the resume's text-scan were as follows: 
        <START_OF_RESUME_TEXT_SCAN> 
        ${scannedText}
        <END_OF_RESUME_TEXT_SCAN>
        `
    })

    messages.push({
        role: "system",
        content: `On your previous attempt to summarize, your responded: "${previousSummary}". The user was not content with this summary. The user will now tell you what you should do differently.`
    })

    if(summaryQuery) {

        messages.push({
            role: "user",
            content: summaryQuery
        })

    }

    messages.push({
        role: "system",
        content: 
        `
        Please provide an updated overall summary of the resume. Do not include any specific contact information in your response.
        Be sure to ONLY respond in the following JSON format:
        {
            summary: <NEW_SUMMARY>
        }
        `
    })

    const response = (await makeAIRequest(messages, chatInstance)).content

    const JSONParsedResponse = JSON.parse(response) 

    return JSONParsedResponse.name   

}



export async function renameResumeApplicant(scannedText, previousName) {

    const chatInstance = new OpenAI(openaiConfig.apiKey);


    


    const messages = []

    messages.push({
        role: "system",
        content: "You are an AI resume screening assistant that previously attempted to find the applicant's name from the text-scan of a resume."
    })

    messages.push({
        role: "system",
        content: `The contents of the resume's text-scan were as follows: 
        <START_OF_RESUME_TEXT_SCAN> 
        ${scannedText}
        <END_OF_RESUME_TEXT_SCAN>
        `
    })

    messages.push({
        role: "system",
        content: `You previously provided the name ${previousName}. This was the incorrect name. Please find the correct name.`
    })

    messages.push({
        role: "system",
        content: 
        `
        Be sure to ONLY respond in the following JSON format:
        {
            name: <NEW_NAME>
        }
        `
    })

    const response = (await makeAIRequest(messages, chatInstance)).content

    const JSONParsedResponse = JSON.parse(response) 

    return JSONParsedResponse.name   

}



export async function rescoreOneResumeOneFilter(scannedText, filter, previousScore, isToBeHigher, reason = undefined) {

    const chatInstance = new OpenAI(openaiConfig.apiKey);





    const messages = []

    messages.push({
        role: "system",
        content: "You are an AI resume screening assistant that has previously scored a resume based on user criteria."
    })

    messages.push({
        role: "system",
        content: `The contents of the resume's text-scan were as follows: 
        <START_OF_RESUME_TEXT_SCAN> 
        ${scannedText}
        <END_OF_RESUME_TEXT_SCAN>
        `
    })

    messages.push({
        role: "system",
        content: `The criteria that the user wants rescored is: "${filter.query}".`
    })

    messages.push({
        role: "user",
        content: `I want the score to be ${isToBeHigher ? "higher" : "lower" + "."}.`
    })

    messages.push({
        role: "user",
        content: `I still want the score to be within the same range the criteria specifies."${filter.query}".`
    })

    if(reason) {

        messages.push({
            role: "user",
            content: reason
        })

    }

    messages.push({
        role: "system",
        content: 
        `
        Please responsd with an updated score for this resume based on the previous criteria.
        Be sure to ONLY respond in the following JSON format:
        {
            score: <NEW_SCORE>
        }
        `
    })

    const response = (await makeAIRequest(messages, chatInstance)).content

    const JSONParsedResponse = JSON.parse(response) 

    return JSONParsedResponse.score

}



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
        Do not include any specific contact information in your response.
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
                    Do not include contact information in these sections.
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

    var JSONParsedResponse = JSON.parse(response) 

    JSONParsedResponse.summaries.Email = resumeFile.contactInfo.emailAddress
    JSONParsedResponse.summaries.Phone = resumeFile.contactInfo.phoneNumber

    //console.log(JSONParsedResponse.summaries)
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