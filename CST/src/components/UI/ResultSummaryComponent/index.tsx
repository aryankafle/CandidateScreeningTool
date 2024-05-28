import { ListItem, useTheme } from "@mui/material";
import { RatingIcon } from "../RatingIcon";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography"
import List from "@mui/material/List";
import { useMemo } from "react";
import { WeighedResult } from "../../../hooks/UseWeighedScores";




export const ResultSummary = (props: {result : WeighedResult | undefined, index : number, onShowOriginal: (index : number) => void, onRerun : (index : number) => void}) => {
    
    const { result, index, onRerun, onShowOriginal } = props

    const name = useMemo(() => {

        if(result?.applicant.name === "null") {

            return undefined

        }

        return result?.applicant.name

    }, [result?.applicant.name])

    const { palette } = useTheme()


    if(!result) {

        return (
            <Stack
                position={"fixed"}
                top={"3.5rem"}
                bottom={"1rem"}
                right={"1rem"}
                p={"2rem"}
                left={"60%"}
                sx={{
                    backgroundColor: palette.background.paper
                }}
                gap={"3rem"}
            >
                
                <Typography
                    variant="h3"
                >

                    Sorry, this resume result couldn't be created!

                </Typography>

                <Button
                    variant="contained"
                    size="large"
                    onMouseDown={() => onRerun(index)}
                >
                    <Typography
                        variant="h5"
                    >
                        Attempt Re-run?
                    </Typography>

                </Button>

            </Stack>
        )
        
    }

    return (

        <Stack
            position={"fixed"}
            top={"3.5rem"}
            bottom={"1rem"}
            right={"1rem"}
            p={"2rem"}
            left={"60%"}
            overflow={"auto"}
            sx={{
                backgroundColor: palette.background.paper
            }}
        >
            
            <Stack
                direction={"row"}
                gap={"1rem"}
            >

                <Typography
                    variant="h4"
                >
                    Name:
                </Typography>
                <Typography
                    variant="h4"
                >
                    {name || "Not Found"}
                </Typography>

            </Stack>

            <Box
                alignSelf={"center"}
            >

                <RatingIcon
                    grade={result.grade}
                    large
                />

            </Box>

            <Button
                variant="text"
                color="secondary"
                size="large"
                sx={{
                    mb: "rem"
                }}
                onMouseDown={() => {

                    onShowOriginal(index)

                }}
            >
                <Typography
                    textAlign={"center"}
                    variant="subtitle1"
                >
                    View Original Resume
                </Typography>
            </Button>


            <Stack
                direction={"row"}
                gap={"1rem"}
            >

                <Typography
                    variant="h5"
                >
                    Overall Score:
                </Typography>
                <Typography
                    variant="h5"
                >
                    {Math.round(result.overall*100)/100 || "0"}
                </Typography>

            </Stack>

            <Divider
                sx={{
                    m: "1rem",
                    mb: "1.6rem"
                }}
            />

            <Typography
                variant="h5"
            >
                Section Summaries:
            </Typography>

            <List>

            { result.summaries.map(summary => {

                return (
                    <ListItem
                        key={result._id + Math.random()}
                    >

                        <Stack>
                            <Typography
                                variant="h6"
                            >
                                {summary.section}
                            </Typography>

                            <Divider
                                sx={{
                                    m: "0.5rem",
                                    mr: "15rem"
                                }}
                            />

                            <Typography
                                variant="subtitle1"
                            >
                                {summary.summary}
                            </Typography>

                        </Stack>

                    </ListItem>

                )

                })}

            </List>

            <Divider
                sx={{
                    m: "1rem"
                }}
            />

            <Typography
                variant="h5"
            >
                Score Breakdown:
            </Typography>

            <List>

            { result.filterScores.map(score => {

                return (
                    <ListItem
                        key={result._id + Math.random()}
                    >

                        <Stack>

                            <Stack
                                direction={"column"}
                                alignItems={"center"}
                            >

                                <Typography
                                    variant="h6"
                                    textAlign={"center"}
                                >
                                    {score.filter}:
                                </Typography>

                                <Typography
                                    variant="h3"
                                    textAlign={"center"}
                                >
                                    {score.value}
                                </Typography>

                            </Stack>

                            <Typography
                                variant="subtitle1"
                            >
                                {score.rationale}
                            </Typography>

                        </Stack>

                    </ListItem>

                )

                })}

            </List>


        </Stack>

    )


}