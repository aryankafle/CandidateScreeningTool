import { useTheme } from "@mui/material";
import { useState } from "react";



import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Button from "@mui/material/Button";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";





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
                        px: "2vw"
                    }}
                    onMouseDown={onSignOut}
                >
                    <Typography
                        fontSize={"1vw"}
                    >
                        Sign Out
                    </Typography>
                </Button>
            </Popover>
            <Button
                aria-describedby={id}
                fullWidth
                onMouseDown={handleUserIconCLick}
            >
                <AccountCircleIcon
                    sx={{
                        fontSize: "1.7vw",
                        mr: "0.7vw",
                    }}
                />
                <Typography
                    sx={{}}
                    fontSize={"1.2vw"}
                >
                    {username}
                </Typography>
            </Button>
        </>
    );
}