import { Result } from '../utils/Result';
import axios from "axios";
import { SavedList } from '../utils/SavedList';
import { Filter } from '../utils/Filter';
 




export const uploadFilesToDatabase = async (fileFormData : FormData, listID: string, userID : string, batchName : string ) => {

    fileFormData.set("listID", listID)
    fileFormData.set("userID", userID)
    fileFormData.set("batchName", batchName)

    await axios.post(`${process.env.REACT_APP_SERVER_NAME}/uploads/upload-resumes-to-db`, fileFormData)
    
}





export const uploadFiltersToDatabase = async (filters : Filter[], listID : string, userID : string) => {
    
    await axios.post(`${process.env.REACT_APP_SERVER_NAME}/uploads/update-filters`, {
        filters: filters.map((filter) => filter.toJSON()),
        listID,
        userID
    })

}





export const filterExistingResumeList = async (listID : string, userID : string) => {    
    
    await axios.post(`${process.env.REACT_APP_SERVER_NAME}/resume-filtering/apply-filters-to-resumes`, {
        listID,
        userID
    })

}





export const getListResults = async (listID : string, userID : string) => {

    const response = await axios.get(`${process.env.REACT_APP_SERVER_NAME}/resume-filtering/get-resume-list`, {
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

        resultsArray.push(Result.fromJSON(resumeResult))
        
    }



    return resultsArray
}

export const getAllUserSavedLists = async (userID : string) => {

    const response = await axios.get(`${process.env.REACT_APP_SERVER_NAME}/selection/get-all-user-saved-lists`, {
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

        const listFromJSON = SavedList.fromJSON(savedList)

        if(!listFromJSON) continue;

        
        
        resultsArray.push(listFromJSON)
        
    }

    return resultsArray
}

export const getUserSelection = async (userID : string) => {

    const response = await axios.get(`${process.env.REACT_APP_SERVER_NAME}/selection/get-user-saved-selection`, {
        params:{
            userID
        }
    })

    return response.data

}

export const postUserLocation = async (userID : string, location : string) => {

    await axios.post(`${process.env.REACT_APP_SERVER_NAME}/selection/set-user-saved-selection`, {
        userID,
        location
    })

}

export const postUserCurrentSavedList = async (userID : string, currentSavedList : SavedList) => {

    await axios.post(`${process.env.REACT_APP_SERVER_NAME}/selection/set-user-saved-selection`, {
        userID,
        currentSavedList
    })

}

export const addSavedList = async (userID : string, savedList : SavedList) => {

    await axios.post(`${process.env.REACT_APP_SERVER_NAME}/selection/add-saved-list`, {
        userID,
        savedList: savedList.toJSON(),
    })

}

export const removeSavedList = async (userID : string, listID : string) => {

    await axios.post(`${process.env.REACT_APP_SERVER_NAME}/selection/remove-saved-list`, {
        userID,
        listID
    })

}

export const getUser = async () => {

    const { data } = await axios.get(
        `${process.env.REACT_APP_SERVER_NAME}/auth/login/success`
        , { withCredentials: true }
    )

    console.log("Successfully Signed In: ", data)
    
    return data.user

}