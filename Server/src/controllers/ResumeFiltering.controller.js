import {

    downloadFileMetadata,

} from "../database/MongoDB.database.js"

import {

    getFilterScoresForResume,
    getSectionSummariesForResume,
    getOverallSummaryForResume,
    getCandidateNameFromResume

} from "../models/services/ResumeScreening.service.js"





export const createResultsForResume = async (req, res) => {

    const fileID = req.body?.fileID

    const filters = req.body?.filters





    const metadata = await downloadFileMetadata(fileID)

    if(!metadata) {

        return res.status(404).send({

            error: true,
            message: "File does not exist."

        })

    }

    

    const scores = await getFilterScoresForResume(metadata.text_scan, filters)
    const summaries = await getSectionSummariesForResume(metadata.text_scan)
    const summary = await getOverallSummaryForResume(metadata.text_scan)

    const applicant = {

        name: await getCandidateNameFromResume().text_scan
        
    }

    const result = {

        fileID, scores, summaries, summary, applicant,

    }






    if(!stream) {

        res.status(500).send({

            error: true,
            message: "File has no data."
            
        })

    }




    

    res.status(200).send({

        error: false,
        result,
        message: "Successfully applied filters to resumes!"

    })

}