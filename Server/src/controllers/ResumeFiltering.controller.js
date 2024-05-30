import sizeOf from "buffer-image-size";
import { downloadFileMetadata, downloadFileReadStream } from "../models/services/DatabaseFiles.service.js";
import { getApplicantFromResume, getFilterScoresForResume, getOverallSummaryForResume, getSectionSummariesForResume } from "../models/services/ResumeScreening.service.js";
import { streamToBuffer, turnPdfToPngs } from "../models/utils/FileConversions.js";
import { getImageMessageFromDocx, getImagesContextMsg } from "../models/utils/ImageMessages.js";




export const createResultsForResume = async (req, res) => {

    const {

        fileID,
        filters

    } = req.body





    let imageContextMsg;
    let imageWidth = 0
    let imageHeight = 0

    try {

        const stream = await downloadFileReadStream(fileID)
        const metadata = await downloadFileMetadata(fileID)

        if(!stream || !metadata) throw Error("No data.")

        const buffer = await streamToBuffer(stream)

        if(metadata.file_type === "application/pdf") {

            const pngsOfPages = await turnPdfToPngs(buffer)

            const dimensions = sizeOf(pngsOfPages[0])

            imageWidth = dimensions.width
            imageHeight = dimensions.height

            imageContextMsg = getImagesContextMsg(pngsOfPages)

        }
        else if(
            ( metadata.file_type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ) ||
            ( metadata.file_type === "application/msword" )
        ) {

            imageContextMsg = await getImageMessageFromDocx(buffer)

        }
        else if (metadata.file_type.includes("image/")) {

            const dimensions = sizeOf(buffer)

            imageWidth = dimensions.width
            imageHeight = dimensions.height

            const pngsOfPages = [buffer]

            imageContextMsg = getImagesContextMsg(pngsOfPages)

        }
        else {

            throw Error("File is not of a supported type.")

        }

    }
    catch (error) {

        return res.status(500).send("Error creating query messages for file!")

    }





    const [

        filterScores,
        summaries,
        summary,
        applicant 

    ] = await Promise.allSettled([

        getFilterScoresForResume(imageContextMsg, filters, imageWidth, imageHeight),
        getSectionSummariesForResume(imageContextMsg, imageWidth, imageHeight),
        getOverallSummaryForResume(imageContextMsg, imageWidth, imageHeight),
        getApplicantFromResume(imageContextMsg, imageWidth, imageHeight),
    
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