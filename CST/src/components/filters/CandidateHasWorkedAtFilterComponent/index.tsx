import { useTheme } from "@mui/material";
import { Filter, generateCompanyNameFilter } from "../../../utils/Filter";
import { SetStateAction } from "react";
import { FilterTextInput } from "../FilterTextInput";





type CandidateHasWorkedAtFilterProps = {

    selectedFilters: Filter[],
    setSelectedFilters: React.Dispatch<SetStateAction<Filter[]>>

}





export const CandidateHasWorkedAtFilter = ({ selectedFilters, setSelectedFilters } : CandidateHasWorkedAtFilterProps) => {

    const { palette } = useTheme()

    return (
        <FilterTextInput
            onSubmit={(value) => {

                if(selectedFilters.some(filter => filter.type === `company-name-${value}`) ) return;

                const companyNameFilter = generateCompanyNameFilter(value)

                setSelectedFilters(prevFilters => [...prevFilters, companyNameFilter])
            
            }}
            placeholder='Samsung' 
        >
            Candidate Has Worked At:
        </FilterTextInput>
    )

}