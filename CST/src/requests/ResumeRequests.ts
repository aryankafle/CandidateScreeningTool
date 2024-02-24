import { Result } from "../utils/Result"
import { Filter } from "../context/FilterContext"
import axios from "axios";

/*
dummy function for now before backend stuff is routed.
*/
export const getSortedResumes = async (resumes : File[], filters : Filter[]) => {
    let list : Result[] = []
    for(let i = 0; i < resumes.length; i++) {
        console.log(            Math.ceil(Math.random() * 998 + 1)        )
        list.push(new Result(
            {name: "applicant" + i},
            resumes[i],
            Math.floor(Math.random() * 1000),
            "this is a candidate " + i,
            filters
        ))
    }

    return list;
}





export const uploadFilesToDatabase = async (fileFormData : FormData, listid: string, usertoken : string) => {
    await axios.post(`${process.env.REACT_APP_SERVER_HOST}:${process.env.REACT_APP_SERVER_PORT}/mongoDB/uploadResumesToDB`, fileFormData, {
        params: {
            listID : listid,
            userToken: usertoken
        }
    })
    return;
}

export const uploadFiltersToDatabase = async (filters : Filter[], listid : string, usertoken : string) => {
    await axios.post(`${process.env.REACT_APP_SERVER_HOST}:${process.env.REACT_APP_SERVER_PORT}/mongoDB/updateFilters`, {
        params: {
            filters: filters,
            listID: listid,
            userToken: usertoken
        }
    })
    return;
}

export const filterExistingResumeList = async (listid : string, usertoken : string) => {
    await axios.post(`${process.env.REACT_APP_SERVER_HOST}:${process.env.REACT_APP_SERVER_PORT}/mongoDB/applyFiltersToResumes`, {
        params:{
            listID: listid,
            userToken: usertoken
        }
    })
    return;
}

export const getListResults = async (listid : string, usertoken : string) => {
    const result = await axios.get(`${process.env.REACT_APP_SERVER_HOST}:${process.env.REACT_APP_SERVER_PORT}/mongoDB/getResumeList`, {
                        params:{
                            listID: listid,
                            userToken: usertoken
                        }
                    })
    return [] as Result[]
}