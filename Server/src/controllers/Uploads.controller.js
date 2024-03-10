import { updateResumeFilters } from "../models/services/MongoDB.service.js";
import { uploadNewSavedList } from "../models/services/MongoDB.service.js";
import { convertFilestoText } from "../models/services/TextScan.service.js";





export const uploadResumesToDB = async (req, res) => {
    
    console.log(`\n\n\nUsing Controller: async uploadResumesToDB`)
    console.log(`--Request Query: ${req.query}\n`)



    

    const textScans = await convertFilestoText(req.files)

    try {

        await uploadNewSavedList(req.files, textScans, req.body?.listID, req.body?.userID)
    
    }
    catch (error) {

        console.log(`Error uploading new saved list. textScans: ${textScans}`)

    }



    res.status(200).json({message: "Successful Upload to Db!"})





    console.log("Controller function finished.\n\n\n")

}





export const updateFilters = async (req, res) => {

    console.log(`\n\n\nUsing Controller: async updateFilters`)
    console.log(`--Request Query: ${req.query}\n`)





    try {

        await updateResumeFilters(req.body?.listID, req.body?.filters);
    
    }
    catch (error) {
        
        console.log("Error updating resume filters: ", error)
        return res.status(500).json({message: "Error updating resume filters."})
    
    }



    res.status(200).json({message: "Successful Upload to Db!"})





    console.log("Controller function finished.\n\n\n")

}