import { WeighedResult } from '../../../hooks/UseWeighedScores';



import Button from '@mui/material/Button';
import ListItem from '@mui/material/ListItem';
import Stack from '@mui/material/Stack';
import Typography from "@mui/material/Typography";

import { useTheme } from "@mui/material";

import { RatingIcon } from '../../UI/RatingIcon';







type CandidateCardProps = {
    
    candidate : WeighedResult | undefined

    index: number
    isSelected: boolean
    onSelectCandidate: (index : number) => void

}





export const CandidateCard = ({ candidate, index, isSelected, onSelectCandidate } : CandidateCardProps) => {

    const { palette } = useTheme()

    if(!candidate) return (

        <></>

    )

    return (
        <ListItem
            key={index}
            
        >
            <Stack
                direction={"row"}
                width={"100%"}
                justifyContent={"space-between"}
                height={"7rem"}
            >

                <Button
                    fullWidth
                    
                    onMouseDown={() => {

                        onSelectCandidate(index)

                    }}
                    variant='contained'
                    color={"secondary"}
                    sx={{
                        mr: "1rem",
                        backgroundColor: isSelected ? palette.secondary.main : palette.background.paper,
                        borderBottomRightRadius: 20,
                        borderTopRightRadius: 10,
                    }}
                >

                    <Stack
                        sx={{
                            borderRadius: 2,
                            borderBottomRightRadius: 20,
                            borderTopRightRadius: 10,
                        }}
                        flexGrow={1}
                        direction={"row"}
                        alignItems={"center"}
                        gap={"3rem"}
                    >

                        <RatingIcon grade={candidate.grade}/>

                        <Typography
                            alignSelf={"center"}
                            textOverflow={"ellipsis"}
                            fontSize={"2rem"}
                            sx={{
                                maxLines: 1,
                                color: palette.text.primary,
                                whiteSpace: "nowrap",
                                userSelect: "none",
                            }}
                        >
                            {candidate.applicant.name}
                        </Typography>

                    </Stack>

                </Button>

            </Stack>




                

        </ListItem>
    );
}