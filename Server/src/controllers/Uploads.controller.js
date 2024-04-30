import { updateResumeFilters } from "../models/services/MongoDB.service.js";
import { uploadNewSavedList } from "../models/services/MongoDB.service.js";
import { convertFileToText } from "../models/services/TextScan.service.js";
import { tokenLimits } from "../config/openai.config.js";
import { getNumTokensFromRequest } from "../models/utils/OpenAIQueryHelpers.js";
import { censorContactInfo } from "../models/services/InfoCensor.service.js";




export const uploadResumesToDB = async (req, res) => {
    
    console.log(`\n\n\nUsing Controller: async uploadResumesToDB`)

    const listID = req.body?.listID
    const userID = req.body?.userID
    const batchName = req.body?.batchName
    const fileArray = req.files





    const textScanArray = await Promise.all(fileArray.map(async (file) => {

        const scanResult = await convertFileToText(file)

        if( !scanResult ) return null

        const censorResult = await censorContactInfo(scanResult.scan)


        console.log(`Done getting text scan for file ${file.originalname} of type ${file.mimetype}.`)
        console.log(`Phone Number for file is ${censorResult.contactInfo.phoneNumber}, Email Address is ${censorResult.contactInfo.emailAddress}`)
        return censorResult

    }))

    if(textScanArray.find((scan) => scan === null)) {
        
        return res.status(500).json({
            error: true,
            fileName: file.originalname,
            fileType: file.mimetype,
            message: `Error getting text scan for file ${file.originalname} of type ${file.mimetype}.`
        })

    }

    const scansOverLimit = textScanArray.filter((scan) => {

        try {

            const scanTokens = getNumTokensFromRequest([{
                role: "user",
                content: scan.text
            }])

            if(scanTokens >= tokenLimits.SCAN_TOKEN_LIMIT) return true

        } catch (error) { return true }

        return false;

    })

    if(scansOverLimit.length > 0) {
        
        return res.status(500).json({
            error: true,
            scans: scansOverLimit,
            message: `Some text scans over maximum scan token limit of ${tokenLimits.SCAN_TOKEN_LIMIT}.`
        })

    }



    await uploadNewSavedList(fileArray, textScanArray, listID, batchName, userID)



    res.status(200).json({
        error: false,
        message: "Successfully uploaded resume files and text scans to db."
    })

    console.log("Controller function finished.\n\n\n")

}





export const updateFilters = async (req, res) => {

    console.log(`\n\n\nUsing Controller: async updateFilters`)





    try {

        await updateResumeFilters(req.body?.listID, req.body?.filters);
    
    }
    catch (error) {
        
        console.log("Error updating resume filters: ", error)

        return res.status(500).json({
            error: error,
            message: "Error updating resume filters."
        })
    
    }



    res.status(200).json({
        error: false,
        message: "Successfully uploaded filters to db."
    })





    console.log("Controller function finished.\n\n\n")

}