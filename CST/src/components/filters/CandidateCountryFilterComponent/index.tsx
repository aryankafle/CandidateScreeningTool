import { useTheme } from "@mui/material";
import { Filter, generateCandidateCountryFilter } from "../../../utils/Filter";
import { SetStateAction } from "react";
import { FilterTextInput } from "../FilterTextInput";





type CandidateCountryFilterProps = {

    selectedFilters: Filter[],
    setSelectedFilters: React.Dispatch<SetStateAction<Filter[]>>

}





export const CandidateCountryFilter = ({ selectedFilters, setSelectedFilters } : CandidateCountryFilterProps) => {

    const { palette } = useTheme()

    return (
        <FilterTextInput
            onSubmit={(value) => {

                if(selectedFilters.some(filter => filter.type === `country-${value}`) ) return;

                const countryNameFilter = generateCandidateCountryFilter(value)

                setSelectedFilters(prevFilters => [...prevFilters, countryNameFilter])
            
            }}
            placeholder='Korea'
        >
            Based in Country:
        </FilterTextInput>
    )

}

export default CandidateCountryFilter