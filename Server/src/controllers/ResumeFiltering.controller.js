import { filterResumes, getSavedList, getUserSavedLists } from "../models/services/MongoDB.service.js";





export const applyFiltersToResumes = async (req, res) => {

    console.log(`\n\n\nUsing Controller: async applyFiltersToResumes`)
    console.log(`--Request Body: ${req.body.toString()}\n`)





    await filterResumes(req.body?.listID)

    res.status(200).json({message: "Successful Upload to Db!"})





    console.log("Controller function finished.\n")

}





export const getResumeList = async (req, res) => {

    console.log(`\n\n\nUsing Controller: async getResumeList`)




                
    try {

        const results = await getSavedList(req.query?.listID)

        console.log(results)
        
        res.status(200).send(results);
    
    }
    catch (error) {
    
        return res.status(500).send({
            error: true,
            message: "Error getting saved list."
        })
    
    }





    console.log("Controller function finished.\n\n\n")

}





export const getAllUserSavedLists = async (req, res) => {

    console.log(`\n\n\nUsing Controller: async getAllUserSavedLists`)





    try {

        const savedLists = getUserSavedLists(req.query?.userID)

        res.status(200).send(savedLists)

    }
    catch (error) {

        res.status(200)

    }
}