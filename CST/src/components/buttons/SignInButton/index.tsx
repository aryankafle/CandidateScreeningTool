import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import { useTheme } from "@mui/material"; 





type SignInButtonProps = {
    onSignIn: () => void
}





export const SignInButton = ({ onSignIn } : SignInButtonProps) => {

    const { palette } = useTheme()

    return (
        <Button
            onMouseDown={onSignIn}
            fullWidth
            sx={{
            }}
        >
            <AccountCircleIcon
                sx={{
                    fontSize: "1.7vw",
                    mr: "0.7vw",
                }}
            />
            <Typography
                fontSize={"1vw"}
            >
                Sign In
            </Typography>
        </Button>
    );
}