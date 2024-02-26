import { updateResumeFilters } from "../models/services/MongoDB.service.js";
import { insertResumeData } from "../models/services/MongoDB.service.js";
import { convertFiletoText } from "../models/services/TextScan.service.js";





export const uploadResumesToDB = async (req, res) => {
    
    console.log(`Using Controller: async uploadResumesToDB
                \n--Request Query: ${req.query}`)





    const textScans = await convertFiletoText(req.files)

    for(let i = 0; i < textScans.length; i++) {

        try {

            await insertResumeData(textScans[i], req.body?.listID, req.body?.userToken, i)
        
        }
        catch (error) {

            console.log(`Error inserting resume data. textScan: ${textScans}, index: ${i}`)

        }

    }



    return res.status(200).json({message: "Successful Upload to Db!"})

}





export const updateFilters = async (req, res) => {

    console.log(`Using Controller: async updateFilters
                \n--Request Query: ${req.query}`)





    try {

        await updateResumeFilters(req.body?.listID, req.body?.userToken, req.body?.filters);
    
    }
    catch (error) {
        
        console.log("Error updating resume filters: ", error)
        return res.status(500).json({message: "Error updating resume filters."})
    
    }



    return res.status(200).json({message: "Successful Upload to Db!"})

}