import { Filter } from "../context/FilterContext"

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

    #overallScore : number
    #scores : number[]
    #resumeFile : File
    #applicant : Applicant
    #filtersApplied : Filter[]
    #summary : string
    #id : string

    constructor(applicant : Applicant, resume : File, scores : any[], summary : string, filtersApplied : Filter[]) {

        function getOverallScore() {

            let cumulative = 0;
            
            scores.forEach((scoreObj) => {
                cumulative += parseInt(scoreObj.score)
            })

            return cumulative / scores.length
        }

        this.#scores = scores;
        this.#overallScore = getOverallScore()
        this.#resumeFile = resume;
        this.#applicant = applicant;
        this.#summary = summary;
        this.#filtersApplied = filtersApplied
        this.#id = crypto.randomUUID()

        if(this.#overallScore > Result.MAX_SCORE) {
            throw new RangeError(`Resume Result Error: Resultant score for "${applicant}"'s greater than maximum score of ${Result.MAX_SCORE}.`)
        }

    }







    get overallScore() { return this.#overallScore}

    get scores() {return this.#scores}



    get grade() {
        
        const scoreRangeOfOneLetterGrade = Result.MAX_SCORE / 5
        
        let gradeNum = Math.ceil(this.#overallScore / scoreRangeOfOneLetterGrade)

        

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





    get resume() { return this.#resumeFile }
    get applicant() { return this.#applicant }
    get summary() { return this.#summary }
    get appliedFilters() { return this.#filtersApplied}
    get id() {return this.#id}
}