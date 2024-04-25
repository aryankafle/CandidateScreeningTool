import { censorContactInfo } from "../models/services/InfoCensor.service.js";
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