import { useQuery } from "react-query"
import { Result } from "../utils/Result"
import { Filter } from "../context/FilterContext"

/*
This is where we'll do the backend request for the resumes.
*/
export const getSortedResumes = async (resumes : File[], filters : Filter[]) => {
    let list : Result[] = []
    for(let i = 0; i < resumes.length; i++) {
        console.log(            Math.ceil(Math.random() * 998 + 1)        )
        list.push(new Result(
            {name: "applicant" + i},
            resumes[i],
            Math.floor(Math.random() * 1000),
            {descriptoin: "this is a candidate " + i},
            filters
        ))
    }

    return list;
}