
import Snackbar from "@mui/material/Snackbar";
import CircularProgress from "@mui/material/CircularProgress";

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
                    size={"1.6em"}
                    sx={{
                        alignSelf: "center",
                        mx: "1.3em"
                    }}
                />
            }
            sx={{
                m: "1em",
                userSelect: "none"
            }}
        />
    );
}