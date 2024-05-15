import { mean } from "simple-statistics"

import { Filter } from "./Filter"





const MINIMUM_CURVE_FACTOR = 0.5



export enum Grades {
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
    rationale : string

}

export type SectionSummary = {

    section : string,
    summary : string

}





export function resultFromJSON(jsonresult : any) {

    const result : Result = {

        filterScores: jsonresult.scores,
        overallScore : mean(jsonresult.scores),
        _id: jsonresult._id,
        applicant: jsonresult.applicant,
        summaries: jsonresult.summaries,
        summary: jsonresult.summary,
        grade: jsonresult.grade

    }

    return result

}



export function weighScoresForOneResult(scores : Score[]) : Score[] {

    const scoreVals = scores.map(score => score.value)

    const curvedScores = scoreVals
    .map( (value, index) : Score => {

        const scaleFactor = -Math.log(MINIMUM_CURVE_FACTOR)

        const curveFactor = Math.exp( -( ( scaleFactor * index ) / scoreVals.length ) )

        return {

            rationale: scores[index].rationale,
            filter: scores[index].filter,

            value: curveFactor * value,

        }

    })

    return curvedScores
    
}



export type Result = {

    readonly filterScores : Score[]

    readonly overallScore : number

    readonly _id : String

    readonly applicant : Applicant

    readonly summaries : SectionSummary[]

    readonly summary : string

    readonly grade : Grades

}

export default Result