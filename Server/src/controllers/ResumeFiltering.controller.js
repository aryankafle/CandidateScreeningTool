import {

    changeResultOfFile,
    downloadFileMetadata,

} from "../models/services/DatabaseFiles.service.js"

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

    
    const [scores, summaries, summary, applicant] = await Promise.all(

        [
            getFilterScoresForResume(metadata.text_scan, filters),
            getSectionSummariesForResume(metadata.text_scan, filters),
            getOverallSummaryForResume(metadata.text_scan, filters),
            getCandidateNameFromResume(metadata.text_scan, filters),
        ]

    )

    const result = {

        fileID, scores, summaries, summary, applicant,

    }

    await changeResultOfFile(fileID, result)





    res.status(200).send({

        error: false,
        result,
        message: "Successfully applied filters to resumes!"

    })

}