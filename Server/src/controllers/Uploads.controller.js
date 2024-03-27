import { updateResumeFilters } from "../models/services/MongoDB.service.js";
import { uploadNewSavedList } from "../models/services/MongoDB.service.js";
import { convertFileToText } from "../models/services/TextScan.service.js";





export const uploadResumesToDB = async (req, res) => {
    
    console.log(`\n\n\nUsing Controller: async uploadResumesToDB`)

    const listID = req.body?.listID
    const userID = req.body?.userID
    const batchName = req.body?.batchName
    const fileArray = req.files

    const previousLoadingState = res.get("Loading-State")





    const textScanArray = await Promise.all(fileArray.map(async (file) => {

        const result = await convertFileToText(file)

        if( !result ) return null


        
        console.log(`Done getting text scan for file ${file.originalname} of type ${file.mimetype}.`)

        return result.scan

    }))

    if(textScanArray.find((scan) => scan === null)) {
        
        return res.status(500).json({
            error: true,
            fileName: file.originalname,
            fileType: file.mimetype,
            message: `Error getting text scan for file ${file.originalname} of type ${file.mimetype}.`
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