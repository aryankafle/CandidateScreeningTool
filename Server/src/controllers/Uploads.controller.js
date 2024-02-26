import { updateResumeFilters } from "../models/services/MongoDB.service.js";
import { insertResumeData } from "../models/services/MongoDB.service.js";
import { convertFiletoText } from "../models/services/TextScan.service.js";





export const uploadResumesToDB = async (req, res) => {
    
    console.log(`\n\n\nUsing Controller: async uploadResumesToDB`)
    console.log(`--Request Query: ${req.query}\n`)





    const textScans = await convertFiletoText(req.files)

    for(let i = 0; i < textScans.length; i++) {

        try {

            await insertResumeData(textScans[i], req.body?.listID, req.body?.userToken)
        
        }
        catch (error) {

            console.log(`Error inserting resume data. textScan: ${textScans}, index: ${i}`)

        }

    }



    res.status(200).json({message: "Successful Upload to Db!"})





    console.log("Controller function finished.\n\n\n")

}





export const updateFilters = async (req, res) => {

    console.log(`\n\n\nUsing Controller: async updateFilters`)
    console.log(`--Request Query: ${req.query}\n`)





    try {

        await updateResumeFilters(req.body?.listID, req.body?.userToken, req.body?.filters);
    
    }
    catch (error) {
        
        console.log("Error updating resume filters: ", error)
        return res.status(500).json({message: "Error updating resume filters."})
    
    }



    res.status(200).json({message: "Successful Upload to Db!"})





    console.log("Controller function finished.\n\n\n")

}