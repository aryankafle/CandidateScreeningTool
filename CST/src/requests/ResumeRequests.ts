import Result, { resultFromJSON } from '../utils/Result';
import axios from "axios";
import { SavedList, savedListFromJSON } from '../utils/SavedList';
import { Filter } from '../utils/Filter';
 




export const uploadResumeToDatabase = (

    file: File,
    userID : string,
    onUploadProgress? : ( percent: number ) => void,
    onDownloadProgress? : ( percent: number ) => void

) => new Promise<string>( async ( resolve, reject ) => {

    const fileFormData = new FormData()

    fileFormData.append("file", file)
    fileFormData.set("userID", userID)


    
    const response = axios.post( `${process.env.REACT_APP_SERVER_NAME}/uploads/upload-resume`, fileFormData, {

        headers: {
            "Content-Type": "multipart/form-data"
        },

        onUploadProgress: (progressEvent) => {

            const loaded = progressEvent.loaded
            const total = progressEvent.total

            if(!total) throw Error("Progres Event has no total.")

            const percentProgress = 100 * loaded / total

            if(onUploadProgress) onUploadProgress(percentProgress)

        },

        onDownloadProgress: (progressEvent) => {

            const loaded = progressEvent.loaded
            const total = progressEvent.total

            if(!total) throw Error("Progres Event has no total.")

            const percentProgress = 100 * loaded / total

            if(onDownloadProgress) onDownloadProgress(percentProgress)

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





export const downloadResume = async (

    fileID : string,
    userID : string

) => {

    const { data } = await axios.get( `${process.env.REACT_APP_SERVER_NAME}/resumes/get-file`, {

        params: {

            fileID,
            userID

        },
        responseType: 'blob'

    })

    try {

        const blob = new Blob([data])

        const file = new File([blob], fileID)
        
        return file

    }
    catch(error) {

        return undefined

    }

}





export const runTextScanOnFile = async (

    fileID : string,
    userID : string

) => {

    await axios.put( `${process.env.REACT_APP_SERVER_NAME}/resumes/create-text-scan`, {

        fileID,
        userID

    })

}





export const createResumeResult = (

    filters : Filter[],
    fileID : string,
    userID : string

) => new Promise<Result>( async (resolve, reject) => {

    const { data, status } = await axios.put(`${process.env.REACT_APP_SERVER_NAME}/filtering/create-resume-result`, {
        
        userID,
        fileID,

        filters

    })

    if( status < 300 ) {

        const result = resultFromJSON(data.result)
        resolve(result)

        return;

    }

    if(status < 400) {

        // Handle partial result

    }

    reject("Request Failed")

})



export async function deleteResumeFromDatabase(fileID : string, userID : string) {

    await axios.delete(`${process.env.REACT_APP_SERVER_NAME}/resumes/delete-result`, { params: {
        
        fileID,
        userID

    }})

}



export async function getResumeResult(fileID : string, listID : string, userID : string) : Promise<Result> {

    const response = await axios.get(`${process.env.REACT_APP_SERVER_NAME}/resumes/get-result`, { params: {

        userID,
        listID,
        fileID

    }})

    return resultFromJSON(response.data)

}



export const saveList = (

    name : string,
    description : string,
    color : string,
    results : Result[],
    userID : string,

) => new Promise<string>( async ( resolve, reject ) => {

    const { data, status } = await axios.post(`${process.env.REACT_APP_SERVER_NAME}/resumes/create-list`, {
        
        name,
        description,
        color,
        results,
        userID

    })

    if( status < 300 ) {

        const id = data.id
        resolve(id)

        return;

    }

    reject("Request Failed")

})



export async function deleteSavedList(listID : string, userID : string) {
    
    await axios.delete(`${process.env.REACT_APP_SERVER_NAME}/resumes/remove-list`, { params: {

        listID,
        userID

    }})

}

export async function deleteUnusedFiles() {
    
    await axios.delete(`${process.env.REACT_APP_SERVER_NAME}/resumes/delete-unused`)

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
            async (data : SavedList) => savedListFromJSON(data))
    )
    return savedListsArr

}



export const getUser = async () => {

    const { data } = await axios.get(
        `${process.env.REACT_APP_SERVER_NAME}/auth/login/success`
        , { withCredentials: true }
    )
    
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



export const postUserCurrentSavedList = async (userID : string, currentSavedList : SavedList) => {

    await axios.put(`${process.env.REACT_APP_SERVER_NAME}/users/set-user-selection`, {
        userID,
        currentSavedList
    })

}



export const getExternalList = async (listID : string) => {

    const response = await axios.get(`${process.env.REACT_APP_SERVER_NAME}/users/get-external-list`, {
        params:{
            listID
        }
    })

    console.log("response data: ", response.data)
    return savedListFromJSON(response.data)
}



export const getFileStream = async (fileID : string) => {

    const response = await axios.get(`${process.env.REACT_APP_SERVER_NAME}/resumes/get-file`, {
        params:{
            fileID,
        }
    })

    return response.data

}

export async function rescoreResume(fileID : string, userID: string){

    const filters: Filter[] = await axios.get(`${process.env.REACT_APP_SERVER_NAME}/resumes/get-filters`, {
        params:{
            fileID,
        }
    })

    await createResumeResult(filters, fileID, userID)


}