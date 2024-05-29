import { useNavigate } from "react-router-dom";



import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import IconButton from "@mui/material/IconButton";

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
                    fontSize: "1.6rem",
                    color: palette.primary.contrastText
                }}
            />
        </IconButton>
    );
}