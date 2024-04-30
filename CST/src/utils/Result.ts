import { Filter } from "./Filter"
import { zScore } from 'simple-statistics'





export type Applicant = {
    name : string
    email? : string
    number? : string
    linkedIn? : string
    age? : number
}



export enum Grades {
    F = 1, D, C, B, A,
}





export class Result {

    private static MAX_SCORE = 1000



    readonly scores : {filter : Filter, score : number}[]

    readonly resume : File

    readonly applicant : Applicant

    readonly summaries : {section : string, summary : string}[]

    readonly summary : string

    private static curveScore(index : number, score : number, numScores : number) {

        const curvingFactor = zScore(index, 0, 1)


        return curvingFactor * score
    
    }







    constructor(applicant : Applicant, resume : File, scores : {filter : Filter, score : number}[], summaries : {section : string, summary : string}[], summary : string) {

        this.applicant = applicant
        this.resume = resume
        this.scores = scores
        this.summaries = summaries
        this.summary = summary

    }





    get overallScore() {

        let cumulative = 0;
        //let pureScoreArr = this.scores.map(({filter: Filter, score: int}) => (int));

        //let highestScore = Math.max.apply(null, pureScoreArr)

        //make curved scores processes an array

        for(let i = 0; i < this.scores.length; i++) {

            cumulative += Result.curveScore(i, this.scores[i].score, this.scores.length)

        }

        return cumulative / this.scores.length

    }



    get grade() {
        
        const scoreRangeOfOneLetterGrade = Result.MAX_SCORE / 5
        
        let gradeNum = Math.ceil(this.overallScore / scoreRangeOfOneLetterGrade)

        

        if(gradeNum < 1) {
            console.warn(`The gradeNum: ${gradeNum}, is too low! It has been increased`)
            gradeNum = 1
        }
        else if (gradeNum > 5) { 
            console.warn(`The gradeNum: ${gradeNum}, is too high! It has been lowered!`)
            gradeNum = 5
        }



        const gradeEnum : Grades = Math.round(gradeNum)
        
        return gradeEnum
    
    }





    public toJSON() {
        return {
           applicant: this.applicant,
           scores: this.scores,
           resume: this.resume,
           summaries: this.summaries
        }
    }
    


    public static fromJSON(jsonresult : any) {

        // _id: file_id,
        // chunkSizeBytes: CHUNK_SIZE,
        // metadata: {
        //     from_saved_list: _id,
        //     file_name,
        //     text_scan,
        //     result: null,
        //     user_id: userID
        // }


        // result = {

        //     file, fileID, filters,
        //     scores, summaries, summary, applicant,
    
        // }

        const result = jsonresult.result

        const translated = {

            applicant: result.applicant,
            scores: result.scores,
            summaries: result.summaries,
            summary: result.summary

        }

        return new Result(
            translated.applicant as Applicant,
            {} as File, // need to replace with file lookup eventually
            translated.scores || {score: 0, filter: {} as Filter},
            translated.summaries || {summary: "summaries error, no summary", section: "summaries error, no section"},
            translated.summary || "summary error"
        )

    }

}