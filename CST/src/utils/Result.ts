import { Filter } from "./Filter"





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







    constructor(applicant : Applicant, resume : File, scores : {filter : Filter, score : number}[], summary : {section : string, summary : string}[]) {

        this.applicant = applicant
        this.resume = resume
        this.scores = scores
        this.summaries = summary

    }



    

    get overallScore() {

        let cumulative = 0;
        
        this.scores.forEach(({filter, score}) => {
            cumulative += score
        })

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

}