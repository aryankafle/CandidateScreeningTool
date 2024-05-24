export type Filter = {

    id: string
    query: string,
    description: string,
    name: string

}

export type Degree = `associates` | `bachelor's` | `master's` | `doctoral` | `any`





export function generateHasDegreeLevelFilter(degree : Degree) {

    const degreeFilter : Filter = {

        id: crypto.randomUUID(),
        name: `Degree Level: ${degree.toLocaleUpperCase()}`,
        description: `Degree Level: ${degree.toLocaleUpperCase()}`,
        query: `The resume should display that the applicant has a collegiate ${degree} degree, or higher.`

    }

    return degreeFilter

}



export function generateKeywordBiasFilter(keywordToBias : string) : Filter {

    const keywordBias : Filter = {

        id: crypto.randomUUID(),
        name: `Keyword Bias: ${keywordToBias}`,
        description: `Keyword: ${keywordToBias}`,
        query: `The resume should bias the keyword ${keywordToBias} or words near it.`

    }

    return keywordBias

}



export function generateYearsOfWorkExperienceFIlter(yearsOfWork : number) : Filter {

    const yearsOfWorkExperience : Filter = {

        id: crypto.randomUUID(),
        name: `Work Experience (yrs): ${yearsOfWork}`,
        description: `Years of Work Experience: ${yearsOfWork}`,
        query: `The resume should directly state or strongly imply that the applicant has ${yearsOfWork} or more years of professional experience in their field.`

    }

    return yearsOfWorkExperience
    
}



export function generateCompanyNameFilter(nameOfCompany : string) : Filter {

    const companyName : Filter = {

        id: crypto.randomUUID(),
        name: `Company: ${nameOfCompany}`,
        description: `Company: ${{nameOfCompany}}`,
        query: `The resume should directly state or strongly imply that the applicant works at or previusly worked at ${nameOfCompany}.`

    }

    return companyName

}



export function generateHasWorkExperienceFilter() {

    const experiencefilter : Filter = {

        id: crypto.randomUUID(),
        name: `Work Experience?`,
        description: `Work Experience?`,
        query: `The resume should display that the applicant has prevoius proffesional work experience.`

    }

    return experiencefilter

}