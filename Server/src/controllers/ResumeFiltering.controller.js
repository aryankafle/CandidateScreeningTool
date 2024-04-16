import { 
    
    getSavedList,
    getUserSavedLists,
    getTextScansFromBatch,
    getFiltersFromBatch,
    updateSavedListResults,

} from "../models/services/MongoDB.service.js";

import {

    getFilterScoresForResume,
    getSectionSummariesForResume,
    getOverallSummaryForResume,
    getCandidateNameFromResume

} from "../models/services/ResumeScreening.service.js"





export const applyFiltersToResumes = async (req, res) => {

    console.log(`\n\n\nUsing Controller: async applyFiltersToResumes`)

    const listID = req.body?.listID
    const userID = req.body?.userID




    
    const files = await getTextScansFromBatch(listID)

    const filters = await getFiltersFromBatch(listID)



    const resultsArray = []

    await Promise.all(files.map(async (file) => {

        let result = {

            filters: filters,
            fileName: file.originalname,
            scores: [],
            summaries: [],
            summary: "",
            applicant: {name: undefined}

        }

        await Promise.all([
            
            getFilterScoresForResume(file, filters).then((scores) => result.scores = scores),
            
            getSectionSummariesForResume(file).then((summaries) => result.summaries = summaries),
            
            getOverallSummaryForResume(file).then((summary) => result.summary = summary),
            
            getCandidateNameFromResume(file).then((applicant) => result.applicant = applicant)
        
        ])
        
        resultsArray.push(result)

    }))



    await updateSavedListResults(listID, userID, resultsArray)




    res.status(200).send({
        error: false,
        message: "Successfully applied filters to resumes!"
    })

    console.log("Controller function finished.\n\n\n")

}





export const getResumeList = async (req, res) => {

    console.log(`\n\n\nUsing Controller: async getResumeList`)




                
    try {

        const results = await getSavedList(req.query?.listID)
        
        res.status(200).send(results);
    
    }
    catch (error) {
    
        return res.status(500).send({
            error: true,
            message: "Error getting saved list."
        })
    
    }





    console.log("Controller function finished.\n\n\n")

}





export const getAllUserSavedLists = async (req, res) => {

    console.log(`\n\n\nUsing Controller: async getAllUserSavedLists`)





    try {

        const savedLists = getUserSavedLists(req.query?.userID)

        res.status(200).send(savedLists)

    }
    catch (error) {

        res.status(200)

    }
}