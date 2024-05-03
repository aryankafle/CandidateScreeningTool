import { censorContactInfo } from "../models/services/InfoCensor.service.js";
import { uploadFile } from "../models/services/DatabaseFiles.service.js";
import { convertFileToText } from "../models/services/TextScan.service.js";

import { tokenLimits } from "../config/openai.config.js";
import { getNumTokensFromString } from "../models/utils/OpenAIQueryHelpers.js";





export const uploadResumeToDatabase = async (req, res) => {

    const listID = req.body?.listID
    const userID = req.body?.userID
    const file = req.files[0]





    const textScan = await convertFileToText(file)

    if(!textScan) {

        return res.status(500).json({

            error: true,
            fileName: file.originalname,
            fileType: file.mimetype,
            message: `Error getting text scan for file ${file.originalname} of type ${file.mimetype}.`
        
        })

    }

    console.log(textScan)

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



    try {

        const fileID = await uploadFile(file, censoredScan, fileID, listID, userID)

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