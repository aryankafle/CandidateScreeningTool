import { censorContactInfo } from "../models/services/InfoCensor.service.js";
import { downloadFileMetadata, uploadFile } from "../models/services/DatabaseFiles.service.js";
import { convertFileToText } from "../models/services/TextScan.service.js";
import { downloadFileReadStream } from "../models/services/DatabaseFiles.service.js";

import { tokenLimits } from "../config/openai.config.js";
import { getNumTokensFromString } from "../models/utils/OpenAIQueryHelpers.js";





export const uploadResumeToDatabase = async (req, res) => {

    const {
        
        userID
    
    } = req.body

    const file = req.file





    try {

        const fileID = await uploadFile(file, userID)

        return res.status(200).json({
            
            fileID,
            censoredScan,
            error: false,
            fileName: file.originalname,
            fileType: file.mimetype,
            message: `Successfully uploaded file ${file.originalname} of type ${file.mimetype} with id ${fileID} to DB!`
    
        })    
    
    }
    catch (error) {

        console.log(`Error uploading file ${file.originalname} of type ${file.mimetype}: `, error)

        return res.status(500).json({
            
            error: true,
            fileName: file.originalname,
            fileType: file.mimetype,
            message: `Error uploading file ${file.originalname} of type ${file.mimetype}.`
        
        })

    }

}


export const runTextScanOnResume = async (req, res) => {

    const fileID = req.body?.fileID





    const readstream = await downloadFileReadStream(fileID)

    const metadata = await downloadFileMetadata(fileID)
    const { file_name, file_type } = metadata


    
    const textScan = await convertFileToText(readstream, file_type)

    const censoredScan = await censorContactInfo(textScan)



    const censoredScanTokenNum = getNumTokensFromString(censoredScan.text)
    
    if(censoredScanTokenNum  > tokenLimits.SCAN_TOKEN_LIMIT) {

        return res.status(500).json({

            error: true,
            fileName: file.originalname,
            fileType: file.mimetype,
            tokenLength: censoredScanTokenNum,
            maxTokens: tokenLimits.SCAN_TOKEN_LIMIT,
            message: `Text scan for file ${file.originalname} of type ${file.mimetype}, which uses ${censoredScanTokenNum} is over the token limit of ${tokenLimits.SCAN_TOKEN_LIMIT}!`
        
        })

    }

}