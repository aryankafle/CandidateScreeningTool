import { Result, Applicant } from '../utils/Result';
import { Location } from "react-router-dom"
import axios from "axios";
import { SavedList } from '../utils/SavedList';
import { Filter } from '../utils/Filter';
 




export const uploadFilesToDatabase = async (fileFormData : FormData, listID: string, userID : string, batchName : string ) => {

    fileFormData.set("listID", listID)
    fileFormData.set("userID", userID)
    fileFormData.set("batchName", batchName)

    await axios.post(`${process.env.REACT_APP_SERVER_HOST}:${process.env.REACT_APP_SERVER_PORT}/uploads/upload-resumes-to-db`, fileFormData)
    
}





export const uploadFiltersToDatabase = async (filters : Filter[], listID : string, userID : string) => {
    
    await axios.post(`${process.env.REACT_APP_SERVER_HOST}:${process.env.REACT_APP_SERVER_PORT}/uploads/update-filters`, {
        filters: filters.map((filter) => filter.toJSON()),
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
        params: {
            listID,
            userID
        }
    })

    const filteredResultsArray = response.data.results



    const resultsArray = []

    for(let i = 0; i < filteredResultsArray.length; i++) {

        const resumeResult = filteredResultsArray[i]

        if(resumeResult?.error) {
            throw new Error(resumeResult?.error)
        }



        const applicant = {
            
            name: resumeResult?.name !== "nouser" ? resumeResult?.name : "NO NAME FOUND",
            
        } as Applicant

        const result = new Result(applicant, resumeResult?.file, resumeResult?.scores, resumeResult?.summary)
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

    const userSavedListsArray = response.data



    const resultsArray = []

    for(let i = 0; i < userSavedListsArray.length; i++) {

        const savedList = userSavedListsArray[i]

        if(savedList?.error) {
            throw new Error(savedList?.error)
        }

        console.log(resultsArray)

        resultsArray.push(new SavedList(
            savedList?.name || "",
            savedList?.description || "",
            savedList?.results || [],
            savedList?.color || undefined,
            savedList?.owner || ""
        ))
        
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

export const postUserLocation = async (userID : string, location : string) => {

    await axios.post(`${process.env.REACT_APP_SERVER_HOST}:${process.env.REACT_APP_SERVER_PORT}/selection/set-user-saved-selection`, {
        userID,
        location
    })

}

export const postUserCurrentSavedList = async (userID : string, currentSavedList : SavedList) => {

    await axios.post(`${process.env.REACT_APP_SERVER_HOST}:${process.env.REACT_APP_SERVER_PORT}/selection/set-user-saved-selection`, {
        userID,
        currentSavedList
    })

}