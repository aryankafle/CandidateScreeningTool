import {

    downloadFile,

} from "../models/services/DatabaseFiles.service.js"

import {

    getFilterScoresForResume,
    getSectionSummariesForResume,
    getOverallSummaryForResume,
    getCandidateNameFromResume

} from "../models/services/ResumeScreening.service.js"





export const createResultsForResume = async (req, res) => {

    console.log(`\n\n\nUsing Controller: async getResultsForResume`)

    const userID = req.body?.userID
    const fileID = req.body?.fileID

    const filters = req.body?.filters





    const { file, textScan } = await downloadFile(fileID, userID)

    const scores = await getFilterScoresForResume(textScan, filters)
    const summaries = await getSectionSummariesForResume(textScan)
    const summary = await getOverallSummaryForResume(textScan)

    const applicant = {

        name: await getCandidateNameFromResume(textScan)
        
    }

    const result = {

        file, fileID, filters,
        scores, summaries, summary, applicant,

    }



    

    res.status(200).send({

        error: false,
        result,
        message: "Successfully applied filters to resumes!"

    })

    console.log("Controller function finished.\n\n\n")

}