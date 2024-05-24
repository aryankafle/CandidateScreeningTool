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
import { Button, useTheme } from "@mui/material"




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

    const [anchorTextUserMenu, setAnchorTextUserMenu] = useState<null | HTMLElement>(null);

    const [ showUserMenu, setShowUserMenu ] = useState(false)
    const toggleShowUserMenu = () => setShowUserMenu(prevOpen => !prevOpen)





    return (
        <AppBar 
            position="sticky"
        >
            <Container
                maxWidth="xl"
                sx={{
                    padding: "0.5em"
                }}
            >
                <Toolbar>
                    { isLoggedIn ?
                    <Typography
                        variant="subtitle1"
                        sx={{
                            mr: "5em"
                        }}
                        color={palette.text.primary}
                    >
                        Welcome, {userData.displayName}
                    </Typography>
                    :
                    <IconButton
                        onMouseDown={handleLogin}
                        size="large"
                        sx={{
                            mr: "3em"
                        }}
                    >
                        <AccountCircleIcon 
                            sx={{
                                fontSize: "1.3em"
                            }}
                        />
                    </IconButton>
                    }
                    
                    <Button
                        variant="text"
                        onMouseDown={() => navigate("/home/resume-upload")}
                    >
                        <Typography
                            variant="subtitle1"
                            mr={"3em"}
                            color={palette.text.primary}
                        >
                            Resume Upload
                        </Typography>
                    </Button>

                    <Button
                        variant="text"
                        onMouseDown={() => navigate("/home/saved-lists")}
                    >
                        <Typography
                            variant="subtitle1"
                            color={palette.text.primary}
                            mr={"3em"}
                        >
                            Saved Lists
                        </Typography>
                    </Button>

                    <Button
                        onMouseDown={handleLogout}
                    >
                        <Typography
                            variant="subtitle1"
                            justifySelf={"flex-end"}
                            sx={{
                                mr: "5em"
                            }}
                            color={palette.text.primary}
                        >
                            Sign Out
                        </Typography>
                    </Button>


                </Toolbar>
                
            </Container>

        </AppBar>
    )
}

export default HeaderComponent