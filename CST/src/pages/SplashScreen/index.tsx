import { useContext } from "react"
import { useNavigate } from "react-router-dom"

import UserContext from "../../context/UserContext"

import { handleLogin } from "../../utils/HandleSignInOut"



import { Button, useTheme } from "@mui/material"

import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"





const SplashScreen = () => {

    const navigate = useNavigate() 

    const { palette } = useTheme()



    const { isLoggedIn } = useContext(UserContext)





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

                <button
                    type="button"
                    onMouseDown={() => {

                        if(isLoggedIn) {

                            navigate("/home")
                            return;

                        }

                        handleLogin()

                    }}
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

                </button>

                
            </Stack>

        </Stack>
             
    )
}

export default SplashScreen