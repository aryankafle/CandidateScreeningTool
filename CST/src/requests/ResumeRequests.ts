import { Result } from '../utils/Result';
import axios from "axios";
import { SavedList } from '../utils/SavedList';
import { Filter } from '../utils/Filter';
 




export const uploadResumeToDatabase = (

    file: File,
    batchID: string,
    userID : string

) => new Promise<string>( async ( resolve, reject ) => {

    const fileFormData = new FormData()

    fileFormData.append("files", file)
    fileFormData.set("listID", batchID)
    fileFormData.set("userID", userID)


    
    const response = axios.post( `${process.env.REACT_APP_SERVER_NAME}/uploads/upload-resume`, fileFormData, {

        headers: {
            "Content-Type": "multipart/form-data"
        }

    })

    

    try {
        
        var { data } = await response
        
    }
    catch (error) {

        data = null;

    }

    if( !data.fileID ) {
        
        reject( "Uploading file did not recieve a fileID." )
        return;

    }

    resolve( data.fileID );

})



export const createResumeResult = (
    filters : Filter[],
    fileID : string,
    userID : string
) => new Promise<void>( async (resolve, reject) => {

    const { status } = await axios.put(`${process.env.REACT_APP_SERVER_NAME}/filtering/create-resume-result`, {
        
        userID,
        fileID,

        filters

    })

    if( status >= 400 ) {

        resolve()
        return;

    }

    reject()

})



export async function deleteResumeFromDatabase(fileID : string, userID : string) {

    await axios.delete(`${process.env.REACT_APP_SERVER_NAME}/resumes/delete-result`, { params: {
        
        fileID,
        userID

    }})

}



export async function getResume(fileID : string, userID : string) : Promise<Result> {

    const response = await axios.get(`${process.env.REACT_APP_SERVER_NAME}/resumes/get-resume-result`, { params: {

        userID,
        fileID

    }})

    return Result.fromJSON(response.data)

}



export async function saveList(savedList : SavedList, batchID : string, fileIDs : string[], userID : string) {

    await axios.post(`${process.env.REACT_APP_SERVER_NAME}/resumes/create-list`, {

        savedList: savedList.toJSON(),
        
        listID: batchID,
        fileIDs,

        userID

    })

}



export async function deleteSavedList(listID : string, userID : string) {

    await axios.delete(`${process.env.REACT_APP_SERVER_NAME}/resumes/remove-list`, { params: {
        
        listID,
        userID

    }})

}



export async function modifySavedList(listID : string, userID : string, newName? : string, newDescription? : string, newColor? : string) {

    await axios.put(`${process.env.REACT_APP_SERVER_NAME}/resumes/modify-list`, { params: {
        
        listID,
        userID,
        
        newName,
        newDescription,
        newColor,

    }})

}



export async function getUserSavedLists (userID : string) : Promise<SavedList[]> {

    const response = await axios.get(`${process.env.REACT_APP_SERVER_NAME}/users/get-user-lists`, { params: {

        userID

    }})

    const savedListsArr : SavedList[] = await Promise.all(
        response.data.map(
            async (data : SavedList) => SavedList.fromJSON(response.data))
    )
    return savedListsArr

}



export const getUser = async () => {

    const { data } = await axios.get(
        `${process.env.REACT_APP_SERVER_NAME}/auth/login/success`
        , { withCredentials: true }
    )

    console.log("Successfully Signed In: ", data)
    
    return data.user

}



export const getUserSelection = async (userID : string) => {

    const response = await axios.get(`${process.env.REACT_APP_SERVER_NAME}/users/get-user-selection`, {
        params:{
            userID
        }
    })

    return response.data

}

export const postUserLocation = async (userID : string, location : string) => {

    await axios.put(`${process.env.REACT_APP_SERVER_NAME}/users/set-user-selection`, {
        userID,
        location
    })

}



export const postUserCurrentSavedList = async (userID : string, currentSavedList : SavedList) => {

    await axios.put(`${process.env.REACT_APP_SERVER_NAME}/users/set-user-selection`, {
        userID,
        currentSavedList
    })

}