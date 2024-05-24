import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Popover from "@mui/material/Popover";

import { useTheme } from "@mui/material"; 
import { useState } from "react";





type SignOutButtonProps = {
    onSignOut: () => void
    username: string
}





export const SignOutButton = ({ onSignOut, username } : SignOutButtonProps) => {

    const { palette } = useTheme()

    const [userMenuAnchor, setUserMenuAnchor] = useState<HTMLButtonElement | null>(null);

    const userMenuOpen = Boolean(userMenuAnchor)

    const id = userMenuOpen ? 'simple-popover' : undefined

    const handleUserIconCLick = (event: React.MouseEvent<HTMLButtonElement>) => setUserMenuAnchor(event.currentTarget);
    const handleUserMenuClose = () => setUserMenuAnchor(null);

    

    return (
        <>
            <Popover
                id={id}
                open={userMenuOpen}
                onClose={handleUserMenuClose}
                anchorEl={userMenuAnchor}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
            >

                <Button
                    variant="text"
                    fullWidth
                    sx={{
                        px: "3rem"
                    }}
                    onMouseDown={onSignOut}
                >
                    Sign Out
                </Button>
            </Popover>
            <Button
                aria-describedby={id}
                fullWidth
                onMouseDown={handleUserIconCLick}
                sx={{}}
            >
                <AccountCircleIcon
                    sx={{
                        fontSize: "1.4em",
                        mr: "0.5rem",
                    }} />
                <Typography
                    sx={{}}
                >
                    {username}
                </Typography>
            </Button>
        </>
    );
}