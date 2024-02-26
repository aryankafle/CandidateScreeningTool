import { Result, Applicant } from '../utils/Result';
import axios from "axios";





export const uploadFilesToDatabase = async (fileFormData : FormData, listID: string, userToken : string) => {

    fileFormData.append("listID", listID)
    fileFormData.append("userToken", userToken)

    await axios.post(`${process.env.REACT_APP_SERVER_HOST}:${process.env.REACT_APP_SERVER_PORT}/uploads/uploadResumesToDB`, fileFormData)
    
}





export const uploadFiltersToDatabase = async (filters : any[], listID : string, userToken : string) => {
    
    await axios.post(`${process.env.REACT_APP_SERVER_HOST}:${process.env.REACT_APP_SERVER_PORT}/uploads/updateFilters`, {
        filters,
        listID,
        userToken
    })

}





export const filterExistingResumeList = async (listID : string, userToken : string) => {    
    
    await axios.post(`${process.env.REACT_APP_SERVER_HOST}:${process.env.REACT_APP_SERVER_PORT}/resume-filtering/applyFiltersToResumes`, {
        listID,
        userToken
    })

}





export const getListResults = async (listid : string, usertoken : string) => {

    const response = await axios.get(`${process.env.REACT_APP_SERVER_HOST}:${process.env.REACT_APP_SERVER_PORT}/resume-filtering/getResumeList`, {
        params:{
            listID: listid,
            userToken: usertoken
        }
    })

    const filteredResultsArray = response.data



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