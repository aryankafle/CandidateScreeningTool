import { useState, useContext, useEffect } from 'react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import BatchContext from '../../context/BatchContext';
import FlagContext from '../../context/FlagContext';
import SelectionContext from '../../context/SelectionContext';

import type { Filter, Degree } from '../../utils/Filter';
import { generateHasDegreeLevelFilter, generateCompanyNameFilter, generateHasWorkExperienceFilter, generateKeywordBiasFilter, generateYearsOfWorkExperienceFIlter } from '../../utils/Filter';



import { IconButton, ToggleButtonGroup, useTheme } from "@mui/material"; 

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography"
import List from "@mui/material/List";
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import DeleteIcon from '@mui/icons-material/Delete';
import StartIcon from '@mui/icons-material/Start';
import ToggleButton from '@mui/material/ToggleButton';

import { FilterLayerCard } from '../../components/list-cards/FilterCard';
import DraggableList from '../../components/views/DraggableList/';
import { BackButton } from '../../components/buttons/BackButton';





const FilterScreen = () => {

    const { palette } = useTheme()

    const [ currentDegreeLevel, setCurrentDegreeLevel ] = useState<Degree | null>(null)

    const { selectedFilters, setSelectedFilters } = useContext(SelectionContext)
    const { previouslySelectedFilters } = useContext(SelectionContext)
    const { flags, updateFlag } = useContext(FlagContext)
    const { loadingState, setLoadingState } = useContext(FlagContext)





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



    async function handleRunSelectedFilters() {

        setLoadingState(true)

        

    }



    function handleDegreeChange(_ : any, value: Degree | undefined) {

        if(!value) {

            setCurrentDegreeLevel(null)
            return;

        }

        setCurrentDegreeLevel(value)
        
    }

    useEffect(() => {



    }, [currentDegreeLevel, setSelectedFilters])




    return (
        <Stack
            width={"100%"}
            height={"100%"}
            flexGrow={1}
            direction={"column"}
        >

            <Stack
                direction={"row"}
                justifyContent={"space-between"}
                py={"0.7em"}
                px={"1rem"}
            >

                <BackButton navto={"/home/resume-upload"} />

                <Button
                    variant='contained'
                    endIcon={
                    <StartIcon
                        sx={{
                            color: palette.primary.contrastText
                        }}
                    />
                    }
                    onMouseDown={handleRunSelectedFilters}
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

            <Stack
                direction={"row"}
                justifyContent={"space-between"}
                height={"100%"}
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

                    <Stack
                        direction={"row"}
                    >
                        <ToggleButtonGroup
                            size='large'
                            value={currentDegreeLevel}
                            onChange={handleDegreeChange}
                            exclusive={true}
                        >
                            <ToggleButton aria-label={"associate's"} value={"associate's"} key="associates">
                                Associates
                            </ToggleButton>,
                            <ToggleButton aria-label={"bachelor's"} value="bachelor's" key="bachelors">
                                Bachelors
                            </ToggleButton>,
                            <ToggleButton aria-label={"master's"} value="master's" key="masters">
                                Masters
                            </ToggleButton>,
                            <ToggleButton aria-label={"doctoral"} value="doctoral" key="doctorate">
                                Doctorate
                            </ToggleButton>
                            <ToggleButton aria-label={"any"} value="any" key="any">
                                Any
                            </ToggleButton>
                        </ToggleButtonGroup>
                    </Stack>

                </Stack>

            </Stack>

        </Stack>
    )

}

export default FilterScreen