import OpenAI from "openai";
import openaiConfig, { scoring } from "../../config/openai.config.js";
import { makeAIRequest } from "../utils/OpenAIQueryBatching.js";
import pdfjs from 'pdfjs-dist'





export function queryAIAboutFile(imageBuffers, query) {

    const message = {

        role: "user",
        content: [
            { type: "text", text: query }
        ],
        "max_tokens": 300

    }

    for(const buffer of imageBuffers) {

        const imageObj = { 
            type: "image_url",
            image_url: {
                url: `data:image/jpeg;base64,${buffer.toString('base64')}`
            }
        }



        message.content.push(imageObj)

    }





    return message

}

async function turnPdfToPngs(file) {

    const pdf = await pdfjs.getDocument( { data: await file.arrayBuffer()} ).promise

    const pageCount = pdf.numPages

    const pngBuffers = []

    for(let i = 1; i <= pageCount; i++) {

        const page = await pdf.getPage(i)

        const scale = 2

        const viewport = page.getViewport({ scale })

        const canvas = document.createElement('canvas')

        const context = canvas.getContext('2d')

        if(!context) throw new Error("no context on page.");

        canvas.width = viewport.width
        canvas.height = viewport.height

        const renderContext = {

            canvasContext: context,
            viewport: viewport

        }

        await page.render(renderContext).promise
        const pngBuffer = canvas.toDataURL('image/png').split(',')[1]



        pngBuffers.push(Buffer.from(pngBuffer, 'base64'))

    }

    return pngBuffers

}



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
        `Respond in the following JSON format: {response: <YOUR_RESPONSE>}`
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
        Respond in the following JSON format: {summary: <NEW_SUMMARY>}
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
        `Respond in the following JSON format: {name: <NEW_NAME>}`
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
        Respond in the following JSON format: {score: <NEW_SCORE>}
        `
    })

    const response = (await makeAIRequest(messages, chatInstance)).content

    const JSONParsedResponse = JSON.parse(response) 

    return JSONParsedResponse.score

}



export async function getFilterScoresForResume(scannedText, filters) {

    const chatInstance = new OpenAI(openaiConfig.apiKey);



    

    const messages = []

    messages.push({
        role: "system",
        content: `You are a helpful AI resume screening assistant. You will score the resume represented by the following text-scan, based on the filter criteria inputted by the user.`
    })

    messages.push({
        role: "system",
        content: `<textscan> 
        ${scannedText}
        </textscan>`
    })

    messages.push({
        role: "system",
        content: `Here are the scoring guidelines: ${JSON.stringify(scoring.scoringGuidlinesObject)}`
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

    const response = (await makeAIRequest(messages, chatInstance)).content

    const JSONParsedResponse = JSON.parse(response)

    JSONParsedResponse.scores.sort((
        (scoreA, scoreB) => scoreB.value - scoreA.value
    ))

    return JSONParsedResponse.scores

}



export async function getSectionSummariesForResume(scannedText) {

    const chatInstance = new OpenAI(openaiConfig.apiKey);



    

    const messages = []

    messages.push({
        role: "system",
        content: "You are a helpful AI resume summarizing assistant. You will create brief section summaries for the resume represented by the following text-scan."
    })

    messages.push({
        role: "system",
        content: `<textscan> 
        ${scannedText}
        </textscan>`
    })

    messages.push({
        role: "system",
        content: `Do not include a section for contact information. Section names may not exceed two words. Section names should be in all-caps. Summaries may not exceed 1 paragraph.`
    })



    messages.push({
        role: "system",
        content: 
        `Respond in the following JSON format: {summaries: [{section: <SECTION_NAME>: summary: <BRIEF_SUMMARY>}, {section: <SECTION_NAME>: summary: <BRIEF_SUMMARY>}, {section: <SECTION_NAME>: summary: <BRIEF_SUMMARY>}, {section: <SECTION_NAME>: summary: <BRIEF_SUMMARY>}, ... {section: <SECTION_NAME>: summary: <BRIEF_SUMMARY>}]}`
    })

    const response = (await makeAIRequest(messages, chatInstance)).content

    var JSONParsedResponse = JSON.parse(response) 

    return JSONParsedResponse.summaries

}



export async function getOverallSummaryForResume(scannedText) {

    const chatInstance = new OpenAI(openaiConfig.apiKey);


    


    const messages = []

    messages.push({
        role: "system",
        content: "You are a helpful AI resume summarizing assistant that will briefly summarize the resume reprsented by the following text scan."
    })

    messages.push({
        role: "system",
        content: `<textscan> 
        ${scannedText}
        </textscan>`
    })

    messages.push({
        role: "system",
        content: `Your summaries should not exceed two short paragraphs.`
    })



    messages.push({
        role: "system",
        content: 
        `Respond in the following JSON format: {summary: <BRIEF_SUMMARY>}`
    })

    const response = (await makeAIRequest(messages, chatInstance)).content

    const JSONParsedResponse = JSON.parse(response) 

    return JSONParsedResponse.summary

}



export async function getApplicantFromResume (scannedText) {

    const chatInstance = new OpenAI(openaiConfig.apiKey);


    

    
    const messages = []

    messages.push({
        role: "system",
        content: "You are a helpful AI assitant that will identify the name of the applicant in the resume represented by the following text scan."
    })

    messages.push({
        role: "system",
        content: `<textscan> 
        ${scannedText}
        </textscan>`
    })

    messages.push({
        role: "system",
        content: 
        `If you cannot find a name, simply populate the neccesary field with "null". Be sure to ONLY respond in the following JSON format: {applicant: {name: <CANDIDATE_NAME>}}`
    })

    const response = (await makeAIRequest(messages, chatInstance)).content

    const JSONParsedResponse = JSON.parse(response) 

    return JSONParsedResponse.applicant

}