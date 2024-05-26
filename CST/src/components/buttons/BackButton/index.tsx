import { useNavigate } from "react-router-dom";



import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { useTheme } from "@mui/material"; 


type BackButtonProps = {

    navto: string

}




export const BackButton = ({ navto } : BackButtonProps) => {

    const navigate = useNavigate()

    const { palette } = useTheme()
    

    return (
        <IconButton
            color={"default"}
            onMouseDown={() => navigate(navto)}
        >
            <ArrowBackIcon 
                sx={{
                    color: palette.primary.contrastText
                }}
            />
        </IconButton>
    );
}