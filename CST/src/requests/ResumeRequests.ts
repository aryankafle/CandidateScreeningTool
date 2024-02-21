import { useQuery } from "react-query"
import { Result } from "../utils/Result"
import { Filter } from "../context/FilterContext"

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

    return;
}

export const uploadFiltersToDatabase = async (filters : Filter[], listid : string, usertoken : string) => {

    return;
}

export const filterExistingResumeList = async (listid : string, usertoken : string) => {

    return;
}

export const getListResults = async (listid : string, usertoken : string) => {

    return [] as Result[]
}