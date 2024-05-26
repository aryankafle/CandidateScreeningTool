import { Stack, Typography } from "@mui/material"

const SplashScreen = () => {
    return (

        <Stack
            width={"100vw"}
            height={"100vh"}
            direction={"column"}
            justifyContent={"center"}
        >

            <Stack
                direction={"row"}
                justifyContent={"center"}
            >

                <Typography
                    fontSize={"5rem"}
                >
                    Candidate Screening Tool
                </Typography>

            </Stack>

        </Stack>
             
    )
}

export default SplashScreen