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

    constructor(applicant : Applicant, resume : File, score : number, summary : {}) {

        if(score > Result.MAX_SCORE) {
            throw new RangeError(`Resume Result Error: Resultant score for "${applicant}"'s greater than maximum score of ${Result.MAX_SCORE}.`)
        }

        this.#score = score;
        this.#resumeFile = resume;
        this.#applicant = applicant;
        this.#summary = summary;
    }

    get applicant() {return this.#applicant}
    get exactScore() { return this.#score}
    get description() { return this.#summary}
    get grade() {
        const scoreRangeOfOneLetterGrade = Result.MAX_SCORE / 5
        const gradeEnum : Grades = Math.round(this.#score / scoreRangeOfOneLetterGrade)

        return gradeEnum
    }
}