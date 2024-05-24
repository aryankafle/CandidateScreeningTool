import { useNavigate } from "react-router-dom";

import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { useTheme } from "@mui/material"; 





export const BackButton = () => {

    const navigate = useNavigate()

    const { palette } = useTheme()
    

    return (
        <IconButton
            color={"default"}
            onMouseDown={() => navigate(-1)}
        >
            <ArrowBackIcon 
                sx={{
                    color: palette.primary.contrastText
                }}
            />
        </IconButton>
    );
}