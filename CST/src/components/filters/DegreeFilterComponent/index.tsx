import { useEffect, useState } from "react";

import { Degree } from "../../../utils/Filter";



import { useTheme } from "@mui/material"; 

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography"
import List from "@mui/material/List";
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';
import Box from '@mui/material/Box';
import Switch from '@mui/material/Switch';
import LinearProgress from '@mui/material/LinearProgress';





type FilterSliderType = {

    onChange: (newDegree: Degree) => void,
    isSelected: boolean

}





export const DegreeFilter = ({ onChange, isSelected } : FilterSliderType) => {
    
    const { palette } = useTheme()



    const [currentDegreeLevel, setCurrentDegreeLevel] = useState<Degree | null>(null)

    useEffect(() => {

        if(!isSelected) {

            setCurrentDegreeLevel(null)

        }

    }, [isSelected])


    


    return (
        <Stack
            direction={"column"}
        >

            <Typography
                sx={{
                    fontSize: "1.3em",
                    pb: "0.5em"
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

                    onChange(chosen)

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