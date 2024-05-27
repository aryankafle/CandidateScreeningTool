import { useTheme } from "@mui/material";
import Icon from "@mui/material/Icon";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { LetterGrade } from "../../../utils/Result";





export const RatingIcon = (props: {grade : LetterGrade, large? : boolean}) => {
    
    const { grade, large } = props

    const { palette } = useTheme()

    const ratingColors = [
        palette.success.main,
        palette.primary.main,
        palette.warning.main,
        palette.secondary.main,
        palette.error.main
    ]





    if(large) {

        return (
            <Stack
                sx={{

                    color: ratingColors[5-grade],
                    backgroundColor: palette.background.default,
                    borderRadius: 20,
                    width: "6em",

                }}
            >
                <Typography
                    alignSelf={"center"}
                    fontSize={"4rem"}
                >
                    {LetterGrade[grade]}
                </Typography>
            </Stack>
        )

    }

    return (

        <div
            style={{
                borderRadius: 30,
                height: "3em",
                overflow: "clip",
                backgroundColor: palette.background.paper,
                aspectRatio: 1,
                flexDirection: "column",
                justifyContent: "center",
                alignContent: "center"
            }}
        >

            <Typography
                alignSelf={"center"}
                fontSize={"1.8rem"}
                textAlign={"center"}
                color={ratingColors[5-grade]}
            >
                {LetterGrade[grade]}
            </Typography>

        </div>


    )


}