import { useContext, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import UserContext from "../../../context/UserContext"

import { useTheme } from "@mui/material"



import AppBar from "@mui/material/AppBar"
import Typography from "@mui/material/Typography"
import Stack from "@mui/material/Stack"
import Container from "@mui/material/Container"
import Toolbar from "@mui/material/Toolbar"
import IconButton from "@mui/material/IconButton"
import Popover from "@mui/material/Popover"
import Button from "@mui/material/Button"
import Menu from "@mui/material/Menu"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import { SignInButton } from "../../buttons/SignInButton"
import { SignOutButton } from "../../buttons/SignOutButton"
import FlagContext from "../../../context/FlagContext"





const handleLogin = () => {
    window.open(
        `${process.env.REACT_APP_SERVER_NAME}/auth/google/callback`,
        "_self"
    )
}

const handleLogout = () => {
    window.open(
        `${process.env.REACT_APP_SERVER_NAME}/auth/logout`,
        "_self"
    )
}



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