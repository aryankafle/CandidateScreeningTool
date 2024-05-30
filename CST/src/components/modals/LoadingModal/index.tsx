
import CircularProgress from "@mui/material/CircularProgress";
import LinearProgress from "@mui/material/LinearProgress";
import Modal from "@mui/material/Modal";
import Stack from "@mui/material/Stack";

import { Typography, useTheme } from "@mui/material";





type LoadingModalProps = {
    
    isLoading : boolean
    loadingPercent : number

}



export const LoadingModal = ({ isLoading, loadingPercent } : LoadingModalProps) => {

    const { palette } = useTheme()

    return (
        <Modal
            open={isLoading}
            aria-labelledby="modal-loading"
            aria-describedby="modal-shows-loading"
            sx={{
                userSelect: "none"
            }}
            onClose={(event, reason) => {

            }}
        >

            <Stack
                direction={"column"}
                height={"100vh"}
                width={"100vw"}
                justifyContent={"flex-start"}
                alignItems={"center"}
            >

                <LinearProgress
                    sx={{
                        width: "100vw",
                        color: palette.secondary.main
                    }}
                    aria-busy={loadingPercent <= 99}
                    variant="determinate"
                    value={loadingPercent}
                />

                <Stack
                    direction={"column"}
                    flex={1}
                    flexGrow={1}
                    alignItems={"center"}
                    justifyContent={"center"}
                >

                    <CircularProgress
                        aria-busy={loadingPercent <= 99}
                        size={"3rem"}
                        sx={{
                            color: palette.secondary.main
                        }}
                    />

                    <Typography
                        fontSize={"2rem"}
                        color={palette.primary.contrastText}
                    >
                        Uploading your files...

                    </Typography>

                    <Typography
                        fontSize={"2rem"}
                        color={palette.primary.contrastText}
                    >
                        This may take a couple of minutes.
                    </Typography>

                </Stack>


            </Stack>

        </Modal>
    );
}