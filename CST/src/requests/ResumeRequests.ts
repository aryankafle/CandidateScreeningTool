import { Result, Applicant } from '../utils/Result';
import { Location } from "react-router-dom"
import axios from "axios";
import { SavedList } from '../utils/SavedLIst';
 




export const uploadFilesToDatabase = async (fileFormData : FormData, listID: string, userID : string) => {

    fileFormData.set("listID", listID)
    fileFormData.set("userID", userID)

    await axios.post(`${process.env.REACT_APP_SERVER_HOST}:${process.env.REACT_APP_SERVER_PORT}/uploads/upload-resumes-to-db`, fileFormData)
    
}





export const uploadFiltersToDatabase = async (filters : any[], listID : string, userID : string) => {
    
    await axios.post(`${process.env.REACT_APP_SERVER_HOST}:${process.env.REACT_APP_SERVER_PORT}/uploads/update-filters`, {
        filters,
        listID,
        userID
    })

}





export const filterExistingResumeList = async (listID : string, userID : string) => {    
    
    await axios.post(`${process.env.REACT_APP_SERVER_HOST}:${process.env.REACT_APP_SERVER_PORT}/resume-filtering/apply-filters-to-resumes`, {
        listID,
        userID
    })

}





export const getListResults = async (listID : string, userID : string) => {

    const response = await axios.get(`${process.env.REACT_APP_SERVER_HOST}:${process.env.REACT_APP_SERVER_PORT}/resume-filtering/get-resume-list`, {
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

export const getAllUserSavedLists = async (userID : string) => {

    const response = await axios.get(`${process.env.REACT_APP_SERVER_HOST}:${process.env.REACT_APP_SERVER_PORT}/selection/get-all-user-saved-lists`, {
        params:{
            userID
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

        resultsArray.push(resumeResult)
        
    }



    return resultsArray
}

export const getUserSelection = async (userID : string) => {

    const response = await axios.get(`${process.env.REACT_APP_SERVER_HOST}:${process.env.REACT_APP_SERVER_PORT}/selection/get-user-saved-selection`, {
        params:{
            userID
        }
    })

    return response.data

}

export const postUserLocation = async (userID : string, location : Location<any>) => {

    await axios.post(`${process.env.REACT_APP_SERVER_HOST}:${process.env.REACT_APP_SERVER_PORT}/selection/set-user-saved-selection`, {
        userID,
        location
    })

}

export const postUserCurrentSavedList = async (userID : string, currentSavedList : SavedList) => {
    console.log(`${userID} userid ${currentSavedList} saved list`)
    await axios.post(`${process.env.REACT_APP_SERVER_HOST}:${process.env.REACT_APP_SERVER_PORT}/selection/set-user-saved-selection`, {
        userID,
        currentSavedList
    })

}