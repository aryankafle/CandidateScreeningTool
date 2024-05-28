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
    sx? : SxProps<Theme>

}





export const FilterSlider = ({ stepSize, min, max, onChange, defaultVal, children, sx } : FilterSliderType) => {

    const { palette } = useTheme()

    return (
        <form>
            <Stack
                direction={"row"}
                sx={{...sx}}
            >

                <Typography
                    sx={{
                        fontSize: "1.rem",
                        maxLines: 1,
                        whiteSpace: "nowrap",
                    }}
                    mr={"1.3rem"}
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