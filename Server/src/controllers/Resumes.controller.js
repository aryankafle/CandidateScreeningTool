import {

    deleteFile,
    downloadFileMetadata,
    downloadFileReadStream,
    downloadFileFilters,
    deleteUnusedFileIDs,
    addResultToFile,

} from "../models/services/DatabaseFiles.service.js";

import {

    uploadList,
    deleteList

} from "../models/services/SavedLists.service.js";

import { ObjectId } from "mongodb";





export const addNewSavedList = async (req, res) => {
    
    const {
        
        userID,
        results,
        name,
        description,
        color

    } = req.body





    try {

        const outputID = await uploadList(

            results,
            name,
            description,
            color,
            userID
            
        )

        res.status(200).json({
            error: false,
            outputID,
            message: "Successfully added saved list."
        })

    }
    catch (error) {

        res.status(500).json({
            error: error,
            message: "Error adding saved list."
        })

    }
    
}



export const removeOldSavedList = async (req, res) => {

    const listID = req.query?.listID





    try {

        await deleteList(listID)

        res.status(200).json({
            error: false,
            message: "Successfully removed saved list."
        })

    }
    catch (error) {

        res.status(500).json({
            error: error,
            message: "Error removing saved list."
        })

    }

}





export const getResumeResult = async (req, res) => {

    const fileID = req.query?.fileID
    const listID = req.query?.listID





    try {

        const resumeMetadata = await downloadFileMetadata(fileID)

        const _id = new ObjectId(listID)

        const result = resumeMetadata.results.find(result => result.from_saved_list.toString() === _id.toString()).result

        if(!result) {

            res.status(500).send({

                error: true,
                message: "No list with such an ID."

            })

        }

        res.status(200).send(result)

    }
    catch (error) {

        console.log(error)

        res.status(500).json({

            error: true,
            message: "Error downloading resume result."

        })

    }

}





export const getResumeFile = async (req, res) => {

    const fileID = req.query?.fileID;





    try {

        const result = await downloadFileReadStream(fileID)

        result.pipe(res)
        res.status(200).send({

            error: false,
            message: "Successfully fetched resume file."

        })

    }
    catch (error) {

        res.status(500).json({

            error: true,
            message: "Error downloading resume file."

        })

    }

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

        res.status(500).send({
            error: true,
            message: `Error deleting file with fileID: ${fileID}.`
        })

    }  

}




export const getResumeFilters = async (req, res) => {

    const fileID = req.query?.fileID;





    try {

        const resumeFillters = await downloadFileFilters(fileID)

        res.status(200).send(resumeFillters)

    }
    catch (error) {

        res.status(500).json({

            error: true,
            message: `Error retrieving resume filters for fileID: ${fileID}.`

        })

    }

}

export const modifyResumeResult = async (req, res) => {

    const fileID = req.body?.fileID
    const result = req.body?.result





    try {

        await addResultToFile(fileID, result)

    }
    catch (error) {

        res.status(200).json({

            error: true,
            message: `Error modifying result of fileID: ${fileID}`

        })

    }


}




export const deleteUnusedFiles = async (req, res) => {


    try {

        await deleteUnusedFileIDs()

        res.status(200).send({
            error: false,
            message: `Successfully deleted files not in saved lists!`
        })

    }
    catch (error) {

        res.status(500).send({
            error: true,
            message: `Error deleting file with file.`
        })

    }  

}
