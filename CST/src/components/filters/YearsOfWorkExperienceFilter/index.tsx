import { SetStateAction } from "react";

import {

    Filter,
    generateCandidateCurrentlyEmployedFilter,
    generateYearsOfWorkExperienceFIlter

} from "../../../utils/Filter";



import { useTheme } from "@mui/material"; 

import Stack from "@mui/material/Stack";
import { FilterSlider } from "../FilterSlider";
import FilterSwitch from "../FilterSwitch";





type YearsOfWorkExperienceProps = {

    selectedFilters: Filter[],
    setSelectedFilters: React.Dispatch<SetStateAction<Filter[]>>
}





export const YearsOfWorkExperienceFilter = ({ selectedFilters, setSelectedFilters } : YearsOfWorkExperienceProps) => {
    
    const { palette } = useTheme()



    function handleChangeYears(newYears : number) {

        const index = selectedFilters.findIndex(filter => filter.type === 'years-of-work-experience')

        const filter = generateYearsOfWorkExperienceFIlter(newYears)

        if(index > -1) {


            setSelectedFilters(prevFilters => {

                const temp = [...prevFilters]
                temp[index] = filter
                return temp

            })

            return;

        }

        setSelectedFilters(prevFilters => [...prevFilters, filter])

    } 





    return (
        <Stack
            direction={"column"}
        >

            <FilterSlider
                stepSize={1}
                onChange={handleChangeYears}
                min={0}
                max={40}
            >
                Years of Work Experience
            </FilterSlider>

            <FilterSwitch
                onChange={(checked) => {

                    const index = selectedFilters.findIndex(filter => filter.type === 'currently-employed')

                    const filter = generateCandidateCurrentlyEmployedFilter(checked)

                    if(index > -1) {


                        setSelectedFilters(prevFilters => {

                            const temp = [...prevFilters]
                            temp[index] = filter
                            return temp

                        })

                        return;

                    }

                    setSelectedFilters(prevFilters => [...prevFilters, filter])

                }}
            >
                Currently Working?
            </FilterSwitch>

        </Stack>
    )

}