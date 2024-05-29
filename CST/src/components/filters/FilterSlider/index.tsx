import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography"
import Slider from '@mui/material/Slider';

import { SxProps, Theme, useTheme } from "@mui/material";





type FilterSliderType = {

    children: string,
    stepSize?: number,
    min: number,
    max: number,
    defaultVal?: number
    onChange: (val: number) => void,

}





export const FilterSlider = ({ stepSize, min, max, onChange, defaultVal, children } : FilterSliderType) => {

    const { palette } = useTheme()

    return (
        <form>
            <Stack
                direction={"row"}
                alignItems={"center"}
            >

                <Typography
                    sx={{
                        fontSize: "1.1vw",
                        maxLines: 1,
                        whiteSpace: "nowrap",
                    }}
                    mr={"1vw"}
                >
                    {children}
                </Typography>

                <Slider
                    aria-label='years-of-work-experience'
                    defaultValue={defaultVal}
                    onChangeCommitted={(event, val) => {
                        
                        event.preventDefault()

                        onChange(val as number)
                    
                    }}
                    size="medium"
                    getAriaValueText={(value) => {return `${value} years of work experience`}}
                    valueLabelDisplay='auto'
                    shiftStep={stepSize}
                    min={min}
                    max={max}
                />
            </Stack>
        </form>
    )

}