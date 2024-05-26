import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import BatchContext from '../../../context/BatchContext';



import { useTheme } from '@mui/material';

import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography"
import StartIcon from '@mui/icons-material/Start';
import CircularProgress from "@mui/material/CircularProgress";

import { BackButton } from "../../buttons/BackButton";





export const FilterScreenHeaderButtons = () => {

    const navigate = useNavigate()

    const { palette } = useTheme()
    


    const { areAllTextScansReady } = useContext(BatchContext)





    return (
        <Stack
            direction={"row"}
            justifyContent={"space-between"}
            py={"0.7em"}
            px={"1rem"}
        >

            <BackButton navto={"/home/resume-upload"} />

            <Stack
                direction={"row"}
                gap={"1rem"}
            >

                { !areAllTextScansReady &&
                <CircularProgress />
                }

                <Button
                    variant="contained"
                    disabled={!areAllTextScansReady}
                    endIcon={
                    <StartIcon
                        sx={{
                            color: palette.primary.contrastText
                        }}
                    />
                    }
                    onMouseDown={ () => navigate("/results") }
                >
                    <Typography
                        sx={{
                            color: palette.primary.contrastText
                        }}
                    >
                        Run Selected Filters
                    </Typography>
                </Button>

            </Stack>

            
        </Stack>
    )
}