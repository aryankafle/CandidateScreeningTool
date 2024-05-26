import { Palette } from "@mui/icons-material"
import { Box, Stack, Typography, useTheme } from "@mui/material"

const SplashScreen = () => {

    const { palette } = useTheme()

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
                    sx={{
                        "@keyframes fontColor": {
                            "0%": {
                                color: palette.text.primary
                            },
                            "50%": {
                                color: palette.text.secondary
                            },
                            "100%": {
                                color: palette.text.primary
                            }
                        },
                        "@keyframes fontSize": {
                            "0%": {
                                fontSize: "5rem"
                            },
                            "100%": {
                                fontSize: "6rem"
                            }
                        },
                        animation: "fontColor 5s ease infinite",
                        "&:hover": {animation: "fontSize 1s ease 1 forwards"}
                    }}
                >

                    Candidate Screening Tool

                </Typography>
                
            </Stack>

        </Stack>
             
    )
}

export default SplashScreen