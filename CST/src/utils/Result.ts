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
    #summary : {}

    constructor(applicant : Applicant, resume : File, score : number, summary : {}) {

        if(score > Result.MAX_SCORE) {
            throw new RangeError(`Resume Result Error: Resultant score for "${applicant}"'s greater than maximum score of ${Result.MAX_SCORE}.`)
        }

        this.#score = score;
        this.#resumeFile = resume;
        this.#applicant = applicant;
        this.#summary = summary;
    }

    get exactScore() { return this.#score}
    get grade() {
        const scoreRangeOfOneLetterGrade = Result.MAX_SCORE / 5
        const gradeEnum : Grades = Math.round(this.#score / scoreRangeOfOneLetterGrade)

        return gradeEnum
    }

    get resume() { return this.#resumeFile }
    get applicant() { return this.#applicant }
    get summary() { return this.#summary }
}