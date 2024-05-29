export type FilterType = (
    'degree'
    | `keyword-bias-${string}`
    | `strict-keyword-bias-${string}`
    | `years-of-work-experience`
    | `company-name-${string}`
    | `country-${string}`
    | 'currently-employed'
    | 'has-work-experience'
)

export type Filter = {

    id: string
    query: string,
    description: string,
    name: string,
    type: FilterType

}

export type Degree = `associate's` | `bachelor's` | `master's` | `doctoral` | `any`





export function generateHasDegreeLevelFilter(degree : Degree) {

    const degreeFilter : Filter = {

        id: crypto.randomUUID(),
        type: "degree",
        name: `Degree Level: ${degree.toLocaleUpperCase()}`,
        description: `Degree Level: ${degree.toLocaleUpperCase()}`,
        query: `The resume directly shows that the applicant has a collegiate ${degree} degree, or higher.`

    }

    return degreeFilter

}



export function generateKeywordBiasFilter(keywordToBias : string, strict : boolean) : Filter {

    if(strict) {

        const strictKeywordBias : Filter = {

            id: crypto.randomUUID(),
            type: `strict-keyword-bias-${keywordToBias}`,
            name: `Strict Keyword Bias: ${keywordToBias}`,
            description: `Strict Keyword: ${keywordToBias}`,
            query: `The resume should contain somewhere, the word "${keywordToBias}" in any format.`
    
        }
    
        return strictKeywordBias

    }

    const keywordBias : Filter = {

        id: crypto.randomUUID(),
        type: `keyword-bias-${keywordToBias}`,
        name: `Keyword Bias: ${keywordToBias}`,
        description: `Keyword: ${keywordToBias}`,
        query: `The resume should contain instances of the keyword ${keywordToBias} or words near in meaning.`

    }

    return keywordBias

}



export function generateYearsOfWorkExperienceFIlter(yearsOfWork : number) : Filter {

    const yearsOfWorkExperience : Filter = {

        id: crypto.randomUUID(),
        type: "years-of-work-experience",
        name: `Work Experience (yrs): ${yearsOfWork}`,
        description: `Years of Work Experience: ${yearsOfWork}`,
        query: `The resume should demonstrate that the applicant has ${yearsOfWork} or more years of professional experience in their field.`

    }

    return yearsOfWorkExperience
    
}



export function generateCompanyNameFilter(nameOfCompany : string) : Filter {
    
    const companyName : Filter = {

        id: crypto.randomUUID(),
        type: `company-name-${nameOfCompany}`,
        name: `Company: ${nameOfCompany}`,
        description: `Company: ${nameOfCompany}`,
        query: `The resume should demonstrate the applicant works at or previusly worked at ${nameOfCompany}.`

    }

    return companyName

}



export function generateCandidateCountryFilter(nameOfCountry : string) {

    const countryName : Filter = {

        id: crypto.randomUUID(),
        type: `country-${nameOfCountry}`,
        name: `Country: ${nameOfCountry}`,
        description: `Country: ${nameOfCountry}`,
        query: `The resume should state that the applicant is based in the country ${nameOfCountry}.`

    }

    return countryName

}



export function generateCandidateCurrentlyEmployedFilter(isCurrentlyEmployed : boolean) {

    const currentlyWorking : Filter = {

        id: crypto.randomUUID(),
        type: "currently-employed",
        name: isCurrentlyEmployed ? "Candidate is currently employed" : "Candidate is currently unemployed",
        description: isCurrentlyEmployed ? "Candidate is currently employed." : "Candidate is currently unemployed.",
        query: `The resume should demonstrate that the applicant is${isCurrentlyEmployed ? " " : " not "}currently employed.`

    }

    return currentlyWorking

}



export function generateHasWorkExperienceFilter() {

    const experiencefilter : Filter = {

        id: crypto.randomUUID(),
        type: "has-work-experience",
        name: `Work Experience?`,
        description: `Work Experience?`,
        query: `The resume should demonstrate that the applicant has previous professional work experience.`

    }

    return experiencefilter

}