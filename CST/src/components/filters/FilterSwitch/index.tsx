import Stack from "@mui/material/Stack";
import Switch from '@mui/material/Switch';
import Typography from "@mui/material/Typography";

import { SxProps, Theme, useTheme } from "@mui/material";





type FilterSwitchType = {

    children: string,
    onChange: (checked: boolean) => void,
    sx? : SxProps<Theme>

}





export const FilterSwitch = ({ onChange, children, sx } : FilterSwitchType) => {

    const { palette } = useTheme()

    return (
        <Stack
            direction={"row"}
        >

            <Switch
                defaultChecked={false}
                color="secondary"
                onChange={(event) => onChange(event.target.checked)}
            />


            <Typography
                sx={{
                    fontSize: "1.3rem",
                    alignSelf: "center",
                    whiteSpace: "nowrap"
                }}
            >
                { children }
            </Typography>

        </Stack>
    )

}