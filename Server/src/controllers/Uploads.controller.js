import { updateResumeFilters } from "../models/services/MongoDB.service.js";
import { uploadFile, deleteFile } from "../models/services/DatabaseFiles.service.js";
import { uploadSavedList } from "../models/services/SavedLists.service.js";
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



    const textScanTokenNum = getNumTokensFromString(textScan.scan.text)
    
    if(textScanTokenNum  > tokenLimits.SCAN_TOKEN_LIMIT) {

        return res.status(500).json({

            error: true,
            fileName: file.originalname,
            fileType: file.mimetype,
            tokenLength: textScanTokenNum,
            maxTokens: tokenLimits.SCAN_TOKEN_LIMIT,
            message: `Text scan for file ${file.originalname} of type ${file.mimetype}, which uses ${textScanTokenNum} is over the token limit of ${tokenLimits.SCAN_TOKEN_LIMIT}!`
        
        })

    }



    try {

        const fileID = await uploadFile(file, textScan, fileID, listID, userID)

        return res.status(200).json({
            
            fileID,

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

export const uploadNewSavedResultList = async (req, res) => {

    const fileIDs = req.body?.fileIDs
    const listID = req.body?.listID
    const userID = req.body?.userID





    try {

        await uploadSavedList(listID, fileIDs, userID)

        res.status(200).send({
            error: false,
            message: "Successfully uploaded new saved list!"
        })

    }
    catch (error) {

        console.log(`Error creating new saved list with id: ${listID}: `, error)

        res.status(500).send({
            error: true,
            message: `Error creating new saved list with id: ${listID}.`
        })

    }

}

export const deleteResumeFromDatabase = async (req, res) => {
    
    const fileID = req.body?.fileID





    try {

        await deleteFile(fileID, userID)

        res.status(200).send({
            error: false,
            message: `Successfully deleted file with fileID: ${fileID}!`
        })

    }
    catch (error) {

        console.log(`Error deleting file with fileID: ${fileID}: `, error)

        res.status(500).send({
            error: true,
            message: `Error deleting file with fileID: ${fileID}.`
        })

    }  

}

export const modifyAttributesOfSavedResultList = async (req, res) => {

    const newName = req.body?.name
    const newDescription = req.body?.description
    const newColor = req.body?.newColor

    const listID = req.body?.listID




    try {

        if(req.newName) await changeSavedListName(listID, newName)
        if(req.newDescription) await changeSavedListDescription(listID, newDescription)
        if(req.newColor) await changeSavedListColor(listID, newColor)

        res.status(200).json({

            error: false,
            message: `Successfully modified list of id ${listID}`
            
        })

    }
    catch (error) {

        res.status(500).json({
            
            error: true,
            message: `Error modifying list of id ${listID}`

        })

    }

}

export const modifyResumeResult = async (req, res) => {

    const fileID = res.body?.fileID
    const result = res.body?.result





    try {

        await changeResultOfFile(fileID, result)

    }
    catch (error) {

        res.status(200).json({

            error: true,
            message: `Error modifying result of fileID: ${fileID}`

        })

    }


}
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