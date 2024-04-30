import {

    downloadResult,

} from "../models/services/DatabaseFiles.service.js"

import {

    deleteFile,

} from "../models/services/DatabaseFiles.service.js";

import {

    uploadSavedList,

} from "../models/services/SavedLists.service.js";





export const addNewSavedList = async (req, res) => {

    console.log(`\n\n\nUsing Controller: async addNewSavedList`)

    const userID = req.body?.userID
    const fileIDs = req.body?.fileIDs
    const listID = req.body?.listID

    const savedList = req.body?.savedList





    try {

        await uploadSavedList(savedList, listID, fileIDs, userID)

        res.status(200).json({
            error: false,
            message: "Successfully added saved list."
        })

    }
    catch (error) {

        console.log("Error adding saved list: ", error)

        res.status(500).json({
            error: error,
            message: "Error adding saved list."
        })

    }
    

    


    console.log("Controller function finished.\n\n\n")

}



export const removeOldSavedList = async (req, res) => {

    console.log(`\n\n\nUsing Controller: async removeOldSavedList`)

    const listID = req.query?.listID





    try {

        await deleteSavedList(listID)

        res.status(200).json({
            error: false,
            message: "Successfully removed saved list."
        })

    }
    catch (error) {

        console.log("Error removing saved list: ", error)

        res.status(500).json({
            error: error,
            message: "Error removing saved list."
        })

    }
    

    


    console.log("Controller function finished.\n\n\n")

}



export const modifySavedList = async (req, res) => {

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





export const getResumeResult = async (req, res) => {

    console.log(`\n\n\nUsing Controller: async getResumeFile`)

    const fileID = req.query?.fileID;





    try {

        const result = await downloadResult(fileID)

        res.status(200).send(result)

    }
    catch (error) {

        res.status(500).json({

            error: true,
            message: "Error downloading resume file."

        })

    }





    console.log("Controller function finished.\n\n\n")

}



export const deleteResumeResult = async (req, res) => {
    
    const fileID = req.query?.fileID





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