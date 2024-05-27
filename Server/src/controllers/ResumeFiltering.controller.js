import {

    addResultToFile,
    downloadFileMetadata,

} from "../models/services/DatabaseFiles.service.js"

import {

    getFilterScoresForResume,
    getSectionSummariesForResume,
    getOverallSummaryForResume,
    getApplicantFromResume

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



    

    const [

        filterScores,
        summaries,
        summary,
        applicant 

    ] = await Promise.allSettled([

        getFilterScoresForResume(metadata.text_scan, filters),
        getSectionSummariesForResume(metadata.text_scan, filters),
        getOverallSummaryForResume(metadata.text_scan, filters),
        getApplicantFromResume(metadata.text_scan, filters),
    
    ])

    if(filterScores.status === "rejected") {

        return res.status(500).send({
            
            error: true,
            message: "Unable to create scores."
            
        })

    }



    const result = {

        _id: fileID,
        
        filterScores: filterScores.value,
        
        summaries: summaries.value,
        summary: summary.value,
        
        applicant: applicant.value,

        filters

    }





    for(const key in result) {

        if(result[key]?.status === "rejected") {

            return res.status(300).send({

                error: false,
                result,
                message: "Some result promises did not work."
                
            })

        }

    }



    res.status(200).send({

        error: false,
        result,
        message: "Successfully applied filters to resumes!"

    })

}