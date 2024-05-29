import { useState } from "react";



import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography"
import Input from '@mui/material/Input';
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
            >

                <FormLabel/>
                    
                <Typography
                    sx={{
                        fontSize: "1.5rem",
                        alignSelf: "center",
                        whiteSpace: "nowrap"
                    }}
                    mr={"1.3rem"}
                >
                    
                    {children}
                </Typography>

                <Input
                    id="filter-text-input"
                    value={text}
                    onChange={(event) => setText(event.target.value)}
                    type="text"
                    placeholder={placeholder}
                    sx={{
                        fontSize: "1.3rem"
                    }}
                    
                />

                
            </Stack>

        </form>
    )

}