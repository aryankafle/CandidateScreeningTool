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
                    fontSize: "1.5rem",
                    pb: "1vh"
                }}
            >
                    Preferred Degree Level
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
                
                <ToggleButton
                    aria-label={"associate's"}
                    value={"associate's"}
                    key="associates"
                    sx={{
                        p: "1vw"
                    }}
                >
                    <Typography
                        fontSize={"1.4rem"}
                    >
                        Associates
                    </Typography>
                </ToggleButton>

                <ToggleButton 
                    aria-label={"bachelor's"}
                    value="bachelor's"
                    key="bachelors"
                    sx={{
                        p: "1vw"
                    }}
                >
                    <Typography
                        fontSize={"1.4rem"}
                    >
                        Bachelors
                    </Typography>
                </ToggleButton>

                <ToggleButton
                    aria-label={"master's"}
                    value="master's"
                    key="masters"
                    sx={{
                        p: "1vw"
                    }}
                >
                    <Typography
                        fontSize={"1.4rem"}
                    >
                        Masters
                    </Typography>
                </ToggleButton>

                <ToggleButton
                    aria-label={"doctoral"}
                    value="doctoral"
                    key="doctorate"
                    sx={{
                        p: "1vw"
                    }}
                >
                    <Typography
                        fontSize={"1.4rem"}
                    >
                        Doctorate
                    </Typography>
                </ToggleButton>

                <ToggleButton
                    aria-label={"any"}
                    value="any"
                    key="any"
                    sx={{
                        p: "1vw"
                    }}
                >
                    <Typography
                        fontSize={"1.4rem"}
                    >
                        Any
                    </Typography>
                </ToggleButton>

            </ToggleButtonGroup>

        </Stack>
    )

}