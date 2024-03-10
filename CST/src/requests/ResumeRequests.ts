import { Result, Applicant } from '../utils/Result';
import axios from "axios";





export const uploadFilesToDatabase = async (fileFormData : FormData, listID: string, userID : string) => {

    fileFormData.set("listID", listID)
    fileFormData.set("userID", userID)

    await axios.post(`${process.env.REACT_APP_SERVER_HOST}:${process.env.REACT_APP_SERVER_PORT}/uploads/uploadResumesToDB`, fileFormData)
    
}





export const uploadFiltersToDatabase = async (filters : any[], listID : string, userID : string) => {
    
    await axios.post(`${process.env.REACT_APP_SERVER_HOST}:${process.env.REACT_APP_SERVER_PORT}/uploads/updateFilters`, {
        filters,
        listID,
        userID
    })

}





export const filterExistingResumeList = async (listID : string, userID : string) => {    
    
    await axios.post(`${process.env.REACT_APP_SERVER_HOST}:${process.env.REACT_APP_SERVER_PORT}/resume-filtering/applyFiltersToResumes`, {
        listID,
        userID
    })

}





export const getListResults = async (listID : string, userID : string) => {

    const response = await axios.get(`${process.env.REACT_APP_SERVER_HOST}:${process.env.REACT_APP_SERVER_PORT}/resume-filtering/getResumeList`, {
        params:{
            listID,
            userID
        }
    })

    const filteredResultsArray = response.data.results



    const resultsArray = []

    for(let i = 0; i < filteredResultsArray.length; i++) {

        console.log(filteredResultsArray[i])
    }

    for(let i = 0; i < filteredResultsArray.length; i++) {

        const resumeResult = filteredResultsArray[i]

        if(resumeResult?.error) {
            throw new Error(resumeResult?.error)
        }



        const applicant = {name: resumeResult?.name !== "nouser" ? resumeResult?.name : "NO NAME FOUND"} as Applicant

        const result = new Result(applicant, resumeResult?.file, resumeResult?.scores, resumeResult?.summary, resumeResult?.filters)
        resultsArray.push(result)
        
    }



    return resultsArray
}