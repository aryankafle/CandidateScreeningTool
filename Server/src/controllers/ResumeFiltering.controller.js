import { filterResumes, getResumeResults } from "../models/services/MongoDB.service.js";





export const applyFiltersToResumes = async (req, res) => {

    console.log(`Using Controller: async applyFiltersToResumes
                \n--Request Query: ${req.query}`)

                



    await filterResumes(req.body?.listID, req.body?.userToken)

    return res.status(200).json({message: "Successful Upload to Db!"})

}





export const getResumeList = async (req, res) => {

    console.log(`Using Controller: async getResumeList
                \n--Request Query: ${req.query}`)





                
    try {

        const results = await getResumeResults(req.query?.listID, req.query?.userToken)
        
        res.status(200).send(results);
    
    }
    catch (error) {
    
        res.status(200).send({})
    
    }

}