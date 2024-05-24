import { useContext, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import UserContext from "../../../context/UserContext"

import AppBar from "@mui/material/AppBar"
import Typography from "@mui/material/Typography"
import Stack from "@mui/material/Stack"
import Container from "@mui/material/Container"
import Toolbar from "@mui/material/Toolbar"
import IconButton from "@mui/material/IconButton"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Button, Menu, useTheme } from "@mui/material"




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

    const [ showUserMenu, setShowUserMenu ] = useState(false)
    const toggleShowUserMenu = () => setShowUserMenu(prevOpen => !prevOpen)





    return (
        <Stack
            position="relative"
            direction={"row"}
            justifyContent={"space-between"}
            px={"4em"}
        >
            <Menu
                open={showUserMenu}
                onClose={toggleShowUserMenu}
            >
                asdfsdf
            </Menu>
            { isLoggedIn ?
            <Button
                onMouseDown={toggleShowUserMenu}
                sx={{
                }}
            >
                <AccountCircleIcon 
                    sx={{
                        fontSize: "1.3em",
                        mr: "0.5rem",
                    }}
                />
                <Typography
                    sx={{

                    }}
                >
                    {userData.displayName}
                </Typography>
            </Button>
            :
            <Button
                onMouseDown={handleLogin}
                sx={{
                }}
            >
                <AccountCircleIcon 
                    sx={{
                        fontSize: "1.3em",
                        mr: "0.5rem",
                    }}
                />
                <Typography
                >
                    Sign In
                </Typography>
            </Button>
            }
            
            <Button
                onMouseDown={() => navigate("/home/resume-upload")}
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

            { isLoggedIn && 
            <Button
                onMouseDown={handleLogout}
            >
                <Typography
                    color={palette.text.primary}
                >
                    Sign Out
                </Typography>
            </Button>
            }

        </Stack>
    )
}

export default HeaderComponent