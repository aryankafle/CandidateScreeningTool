import { Filter } from "../context/FilterContext"

export type Applicant = {
    name : string
    email? : string
    number? : string
    linkedIn? : string
    age? : string
}





enum Grades {
    A, B, C, D, F
}

export class Result {
    
    private static MAX_SCORE = 10000

    #score : number
    #resumeFile : File
    #applicant : Applicant
    #summary : {}
    #filters : Filter[]

    constructor(applicant : Applicant, resume : File, score : number, summary : {}, filters : Filter[]) {

        if(score > Result.MAX_SCORE) {
            throw new RangeError(`Resume Result Error: Resultant score for "${applicant}"'s greater than maximum score of ${Result.MAX_SCORE}.`)
        }

        this.#score = score;
        this.#resumeFile = resume;
        this.#applicant = applicant;
        this.#summary = summary;
        this.#filters = filters;
    }

    get applicant() {return this.#applicant}
    get exactScore() { return this.#score}
    get description() { return this.#summary}
    get filters() { return this.#filters}
    get grade() {
        const scoreRangeOfOneLetterGrade = Result.MAX_SCORE / 5
        const gradeEnum : Grades = Math.round(this.#score / scoreRangeOfOneLetterGrade)

        return gradeEnum
    }

    get resume() { return this.#resumeFile }
    get applicant() { return this.#applicant }
    get summary() { return this.#summary }
}