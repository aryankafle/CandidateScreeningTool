import { useState } from "react";



import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography"
import TextField from '@mui/material/TextField';
import FormLabel from "@mui/material/FormLabel";

import { SxProps, Theme, useTheme } from "@mui/material";





type FilterTextInputType = {

    children: string,
    onSubmit?: (value: string) => void,
    sx? : SxProps<Theme>,
    placeholder?: string

}





export const FilterTextInput = ({ onSubmit, children, placeholder, sx } : FilterTextInputType) => {

    const { palette } = useTheme()

    const [ text, setText ] = useState("")

    return (
        
        <form
            onSubmit={(event) => {

                event.preventDefault()

                if(text && onSubmit) {

                    onSubmit(text)

                    setText("")

                    return;

                }

            }}
        >

            <Stack
                direction={"row"}
                sx={{
                    width: "40em",
                }}
            >

                <FormLabel/>
                    
                <Typography
                    sx={{
                        fontSize: "1.3em",
                        alignSelf: "center",
                        whiteSpace: "nowrap"
                    }}
                    mr={"1.3em"}
                >
                    
                    {children}
                </Typography>

                <TextField
                    id="filter-text-input"
                    label={placeholder}
                    value={text}
                    onChange={(event) => setText(event.target.value)}
                    type="text"
                    
                />

                
            </Stack>

        </form>
    )

}