import { updateResumeFilters } from "../models/services/MongoDB.service.js";
import { uploadNewSavedList } from "../models/services/MongoDB.service.js";
import { convertFilestoText } from "../models/services/TextScan.service.js";





export const uploadResumesToDB = async (req, res) => {
    
    console.log(`\n\n\nUsing Controller: async uploadResumesToDB`)



    

    const textScans = await convertFilestoText(req.files)

    try {

        await uploadNewSavedList(req.files, textScans, req.body?.listID, req.body?.batchName, req.body?.userID)
    
    }
    catch (error) {

        console.log(`Error uploading new saved lists. error: ${error}`)

        res.status(500).json({
            error: error,
            message: `Error uploading new saved lists. textScans: ${textScans}`
        })

    }



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