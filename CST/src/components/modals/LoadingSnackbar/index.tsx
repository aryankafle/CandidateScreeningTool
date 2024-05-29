
import CircularProgress from "@mui/material/CircularProgress";
import Snackbar from "@mui/material/Snackbar";

import { useTheme } from "@mui/material";





type LoadingSnackbarProps = {
    
    isLoading : boolean
    loadingPercent : number

}



export const LoadingSnackbar = ({ isLoading, loadingPercent } : LoadingSnackbarProps) => {

    const { palette } = useTheme()

    return (
        <Snackbar
            open={(isLoading)}
            message={`Creating Text Scans... ${Math.round(loadingPercent*100)/100}%`}
            action={
                <CircularProgress
                    size={"1.rem"}
                    sx={{
                        alignSelf: "center",
                        mx: "1.rem"
                    }}
                />
            }
            sx={{
                m: "rem",
                userSelect: "none"
            }}
        />
    );
}