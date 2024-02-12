import { Filter } from "../context/FilterContext"

export type Applicant = {
    name : string
    email? : string
    number? : string
    linkedIn? : string
    age? : number
}





export enum Grades {
    F, D, C, B, A
}

export class Result {
    
    private static MAX_SCORE = 1000

    #score : number
    #resumeFile : File
    #applicant : Applicant
    #filtersApplied : Filter[]
    #summary : {}
<<<<<<< HEAD
    #filters : Filter[]

    constructor(applicant : Applicant, resume : File, score : number, summary : {}, filters : Filter[]) {
=======
    #id : string

    constructor(applicant : Applicant, resume : File, score : number, summary : {}, filtersApplied : Filter[]) {
>>>>>>> f8a868963871ff13435acbcef7914363239be981

        if(score > Result.MAX_SCORE) {
            throw new RangeError(`Resume Result Error: Resultant score for "${applicant}"'s greater than maximum score of ${Result.MAX_SCORE}.`)
        }

        this.#score = score;
        this.#resumeFile = resume;
        this.#applicant = applicant;
        this.#summary = summary;
<<<<<<< HEAD
        this.#filters = filters;
=======
        this.#filtersApplied = filtersApplied
        this.#id = crypto.randomUUID()
>>>>>>> f8a868963871ff13435acbcef7914363239be981
    }

    get exactScore() { return this.#score}
    get description() { return this.#summary}
    get filters() { return this.#filters}
    get grade() {
        const scoreRangeOfOneLetterGrade = Result.MAX_SCORE / 5
        const gradeEnum : Grades = Math.floor(this.#score / scoreRangeOfOneLetterGrade)

        return gradeEnum
    }

    get resume() { return this.#resumeFile }
    get applicant() { return this.#applicant }
    get summary() { return this.#summary }
    get appliedFilters() { return this.#filtersApplied}
    get id() {return this.#id}
}