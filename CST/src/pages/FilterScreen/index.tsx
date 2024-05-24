import { useState, useContext, useEffect } from 'react';
import { Filter } from '../../utils/Filter';
import { closeCircleOutline } from "ionicons/icons";
import React from 'react';
import DraggableList from '../../components/views/DraggableList/';
import SelectionContext from '../../context/SelectionContext';
import FlagContext from '../../context/FlagContext';
import { helpCircleOutline } from 'ionicons/icons';
import BatchContext from '../../context/BatchContext';

import { IconButton, useTheme } from "@mui/material"; 
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography"
import List from "@mui/material/List";
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import DeleteIcon from '@mui/icons-material/Delete';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import { FilterLayerCard } from '../../components/list-cards/FilterCard';





class KeywordBiasFilter extends Filter {

    constructor(keyword : string) {
        super(
            `Keyword Bias: ${keyword}`,
            `The resume should contain the word or phrase: "${keyword}".`,
        )
    }

}





class YearsOfWorkExperienceFilter extends Filter {

    constructor(quantity : number) {
        if(quantity !== 0) {
            super(
                `Years of Work Experience: ${quantity}`, 
                `The resume should indicate or strongly imply that the applicant has ${quantity} or more years of professional work experience.`,
                quantity
            )
        }

        else {

            throw new RangeError("Quantity must be a positive integer.")

        }
    }

}





class HasDegreeFilter extends Filter {

    constructor() {

        super("Resume Mentions Collegiate Degree", "The resume must show that the applicant is a COLLEGE GRADUATE and ALREADY HAS a collegiate level degree. This must be expliclity stated. Give a score of 0 if they attend high school.")
    
    }

}





class HasWorkExperienceFilter extends Filter {

    constructor() {
        
        super("Resume Contains Work Experience", "The resume should contain professional work experience.")

    }

}





const FilterScreen = () => {

    const { palette } = useTheme()

    const { selectedFilters, setSelectedFilters } = useContext(SelectionContext)

    const { previouslySelectedFilters } = useContext(SelectionContext)

    const { updateFlag } = useContext(FlagContext)

    const { loadingState, setLoadingState } = useContext(FlagContext)

    const [ instructionsPanelClicked, setInstructionsPanelClicked ] = useState(false)





    useEffect(() => {
        
        if (selectedFilters.length !== previouslySelectedFilters.length) {

            updateFlag({flag: 'filters have changed', action: 'activate'})
            return;

        }

        for(let i = 0; i < selectedFilters.length; i++) {

            if(selectedFilters[i].id !== previouslySelectedFilters[i].id) {

                updateFlag({flag: 'filters have changed', action: 'activate'})
                return;
            }

        }



        updateFlag({flag: 'filters have changed', action: 'deactivate'})
    
    }, [selectedFilters, previouslySelectedFilters, updateFlag])
    
    function handleRemoveFilter(index : number) {

        const temp = [...selectedFilters].filter((filter, someIndex) => someIndex !== index)
        
        setSelectedFilters(temp)
        
    }




   return (
    <Stack
        width={"100%"}
        height={"100%"}
        flexGrow={1}
    >
        <Stack
            direction={"row"}
            justifyContent={"space-between"}
            height={"100%"}
            mt={"2rem"}
            width={"100%"}
        >
            <Stack
                direction={"column"}
                sx={{
                    backgroundColor: palette.background.paper,
                    borderStartEndRadius: 40,
                }}
                p={"1rem"}
                width={"40%"}
                overflow={"hidden"}
            >

                <Typography
                    sx={{
                        fontSize: "3vw",
                        textAlign: "center"
                    }}
                >
                    Current Filter Layers:
                </Typography>

                <List
                    sx={{
                        height: "100%",
                        overflow: "auto",
                        padding: "0.333em"
                    }}
                >
                    <DraggableList
                        uniqueIDItems={selectedFilters}
                        setUniqueIDItems={setSelectedFilters}
                        onDelete={(index) => handleRemoveFilter(index)}
                        ItemCard={FilterLayerCard}
                        className="h-[10em] overflow-x-clip"
                    />
                </List>

            </Stack>



            <Stack
                direction={"column"}
                sx={{
                    backgroundColor: palette.background.paper,
                    borderStartStartRadius: 40,
                    width: "50%"
                }}
                height={"100%"}
                p={"1rem"}
            >

                <Typography
                    sx={{
                        fontSize: "3vw",
                        textAlign: "center"
                    }}
                >
                    Add Filters
                </Typography>

                <Button
                    variant="contained"
                    onMouseDown={() => {setSelectedFilters(prevFilters => [...prevFilters, new HasDegreeFilter()])}}
                >
                    add test
                </Button>

            </Stack>

        </Stack>
    </Stack>
   )

}

export default FilterScreen