import { filterResumes, getResumeResults } from "../models/services/MongoDB.service.js";





export const applyFiltersToResumes = async (req, res) => {

    console.log(`\n\n\nUsing Controller: async applyFiltersToResumes`)
    console.log(`--Request Query: ${req.query}\n`)

                



    await filterResumes(req.body?.listID, req.body?.userToken)

    res.status(200).json({message: "Successful Upload to Db!"})





    console.log("Controller function finished.\n")

}





export const getResumeList = async (req, res) => {

    console.log(`\n\n\nUsing Controller: async getResumeList`)
    console.log(`--Request Query: ${req.query}\n`)




                
    try {

        const results = await getResumeResults(req.query?.listID, req.query?.userToken)
        
        res.status(200).send(results);
    
    }
    catch (error) {
    
        res.status(200).send({})
    
    }





    console.log("Controller function finished.\n\n\n")

}

export const getDefaultResumeList = async (req, res) => {

    console.log(`\n\n\nUsing Controller: async getDefaultResumeList`)
    console.log(`--Request Query: ${req.query}\n`)




                
    try {

        const results = await getResumeResults(req.query?.userToken)
        
        res.status(200).send(results);
    
    }
    catch (error) {
    
        res.status(200).send({})
    
    }





    console.log("Controller function finished.\n\n\n")

}