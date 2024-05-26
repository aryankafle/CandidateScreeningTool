import { useContext } from "react"
import { useNavigate } from "react-router-dom"

import UserContext from "../../../context/UserContext"
import FlagContext from "../../../context/FlagContext"

import { handleLogin, handleLogout } from "../../../utils/HandleSignInOut"



import { useTheme } from "@mui/material"

import Typography from "@mui/material/Typography"
import Stack from "@mui/material/Stack"
import Button from "@mui/material/Button"

import { SignInButton } from "../../buttons/SignInButton"
import { SignOutButton } from "../../buttons/SignOutButton"





const HeaderComponent = () => {

    const { palette } = useTheme()
    const navigate = useNavigate()

    const { userData, isLoggedIn } = useContext(UserContext)

    const { flags } = useContext(FlagContext)

    





    return (
        <Stack
            position="relative"
            direction={"row"}
            justifyContent={"space-between"}
            sx={{
                backgroundColor: palette.background.paper
            }}
        >
            {isLoggedIn ?
            <SignOutButton onSignOut={handleLogout} username={userData.name.givenName} />
            :
            <SignInButton onSignIn={handleLogin}/>
            }
            
            <Button
                onMouseDown={() => {

                    if(flags.active.includes('uploads have been processed')) {

                        navigate("/filter")
                        return;

                    }

                    navigate("/home/resume-upload")
                    
                }}
                fullWidth
                sx={{
                }}
            >
                <Typography
                    color={palette.text.primary}
                >
                    Resume Upload
                </Typography>
            </Button>

            <Button
                fullWidth
                onMouseDown={() => navigate("/home/saved-lists")}
                sx={{
                }}
            >
                <Typography
                    color={palette.text.primary}
                >
                    Saved Lists
                </Typography>
            </Button>

        </Stack>
    )
}

export default HeaderComponent