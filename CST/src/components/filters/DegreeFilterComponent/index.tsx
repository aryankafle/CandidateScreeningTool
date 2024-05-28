import React, { SetStateAction, useEffect, useState } from "react";

import { Degree, Filter, generateHasDegreeLevelFilter } from "../../../utils/Filter";



import { useTheme } from "@mui/material"; 

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography"
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';





type DegreeFilterProps = {

    selectedFilters: Filter[],
    setSelectedFilters: React.Dispatch<SetStateAction<Filter[]>>

}





export const DegreeFilter = ({ selectedFilters, setSelectedFilters } : DegreeFilterProps) => {
    
    const { palette } = useTheme()

    const [currentDegreeLevel, setCurrentDegreeLevel] = useState<Degree | null>(null)
    


    useEffect(() => {

        if(!selectedFilters.some(filter => filter.type === 'degree')) {

            setCurrentDegreeLevel(null)
            return;

        }

    }, [selectedFilters])

    

    function handleChangeDegreeLevel(newDegreeLevel : Degree, ) {

        if(currentDegreeLevel === newDegreeLevel) {

            setCurrentDegreeLevel(null)
            setSelectedFilters(prevFilters => {

                const filtered = prevFilters.filter(filter => filter.type !== 'degree')

                return filtered

            })
            return;

        }

        const index = selectedFilters.findIndex(filter => filter.type === 'degree')

        const filter = generateHasDegreeLevelFilter(newDegreeLevel)

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

            <Typography
                sx={{
                    fontSize: "1.rem",
                    pb: "0.rem"
                }}
            >
                    Degree Level
            </Typography>

            <ToggleButtonGroup
                size='large'
                value={currentDegreeLevel}
                onChange={(event) => {

                    const chosen = event.currentTarget.ariaLabel as Degree

                    setCurrentDegreeLevel(chosen)

                    handleChangeDegreeLevel(chosen)

                }}
                exclusive={true}
            >
                
                <ToggleButton aria-label={"associate's"} value={"associate's"} key="associates">
                    Associates
                </ToggleButton>

                <ToggleButton aria-label={"bachelor's"} value="bachelor's" key="bachelors">
                    Bachelors
                </ToggleButton>

                <ToggleButton aria-label={"master's"} value="master's" key="masters">
                    Masters
                </ToggleButton>

                <ToggleButton aria-label={"doctoral"} value="doctoral" key="doctorate">
                    Doctorate
                </ToggleButton>

                <ToggleButton aria-label={"any"} value="any" key="any">
                    Any
                </ToggleButton>

            </ToggleButtonGroup>

        </Stack>
    )

}