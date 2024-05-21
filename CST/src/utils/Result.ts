import { mean } from "simple-statistics"

import { Filter } from "./Filter"
import { clamp } from "lodash"
import { SavedList } from "./SavedList"
import { getResumeResult } from "../requests/ResumeRequests"





export const MINIMUM_CURVE_FACTOR = 0.5
export const MAX_SCORE = 1000




export enum LetterGrade {
    F = 1, D, C, B, A,
}

export type Applicant = {

    name : string
    email? : string
    number? : string
    linkedIn? : string
    age? : number
    
}

export type Score  = {

    filter : Filter,
    value : number,
    rationale : string,

}

export type WeighedScores = {

    weighedScores : Score[]
    overall : number
    grade : LetterGrade
    
}

export type SectionSummary = {

    section : string,
    summary : string

}





export function resultFromJSON(jsonresult : any) {

    console.log(jsonresult)

    const result : Result = {

        filterScores: jsonresult.filterScores,
        _id: jsonresult._id,
        applicant: jsonresult.applicant,
        summaries: jsonresult.summaries,
        summary: jsonresult.summary,

    }

    return result

}



export const getResults = async (list : SavedList, userID : string) => {

    const settleResults = await Promise.allSettled( list.file_ids.map( fileID => getResumeResult( fileID, list._id, userID ) ) )

    const successfulResults : Result[] = []

    for(const settleResult of settleResults) {

        if(settleResult.status === "fulfilled") {

            successfulResults.push(settleResult.value)
            
        }

    }

    return successfulResults

}



export function weighScoresForOneResult(scores : Score[]) : WeighedScores {

    const scoreVals = scores.map(score => score.value)

    const weighedScores = scoreVals
    .map( (value, index) : Score => {

        const scaleFactor = -Math.log(MINIMUM_CURVE_FACTOR)

        const curveFactor = Math.exp( -( ( scaleFactor * index ) / scoreVals.length ) )

        const curvedScore = curveFactor * value

        return {

            rationale: scores[index].rationale,
            filter: scores[index].filter,

            value: curvedScore,
        }

    })



    const overall = mean(weighedScores.map(score => score.value))

    const grade = clamp( Math.ceil( 5 * ( overall + 1 ) / MAX_SCORE ) , 5 ) as LetterGrade

    





    return {

        weighedScores,
        overall,
        grade
    
    }
    
}



export type Result = {

    readonly filterScores : Score[]

    readonly _id : string

    readonly applicant : Applicant

    readonly summaries : SectionSummary[]

    readonly summary : string

}

export default Result