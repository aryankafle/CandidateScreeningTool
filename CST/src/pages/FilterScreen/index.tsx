import { useState, useContext, useEffect } from 'react';
import React from 'react';



import BatchContext from '../../context/BatchContext';
import SelectionContext from '../../context/SelectionContext';

import { 
    
    Degree,
    FilterType,
    
    generateHasDegreeLevelFilter,
    generateCompanyNameFilter,
    generateKeywordBiasFilter,
    generateYearsOfWorkExperienceFIlter,
    generateCandidateCurrentlyEmployedFilter,
    generateCandidateCountryFilter

} from '../../utils/Filter';



import { useTheme } from "@mui/material"; 

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography"
import List from "@mui/material/List";
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';
import Box from '@mui/material/Box';
import Switch from '@mui/material/Switch';
import LinearProgress from '@mui/material/LinearProgress';

import { FilterLayerCard } from '../../components/list-cards/FilterCard';
import { FilterSlider } from '../../components/filters/FilterSlider';
import DraggableList from '../../components/views/DraggableList/';
import FilterSwitch from '../../components/filters/FilterSwitch';
import { FilterTextInput } from '../../components/filters/FilterTextInput';
import { FilterScreenHeaderButtons } from '../../components/UI/FilterScreenHeaderButtons';
import { LoadingSnackbar } from '../../components/modals/LoadingSnackbar';
import { DegreeFilter } from '../../components/filters/DegreeFilterComponent';
import { YearsOfWorkExperienceFilter } from '../../components/filters/YearsOfWorkExperienceFilter';
import CandidateHasWorkedAtFilter from '../../components/filters/CandidateHasWorkedAtFilterComponent';
import CandidateCountryFilter from '../../components/filters/CandidateCountryFilterComponent';
import KeywordBiasFilter from '../../components/filters/KeywordBiasFilterComponent';





const FilterScreen = () => {

    const { palette } = useTheme()

    const [ currentDegreeLevel, setCurrentDegreeLevel ] = useState<Degree | null>(null)

    const {

        selectedFilters,
        setSelectedFilters,
        previouslySelectedFilters

    } = useContext(SelectionContext)
    
    const {

        fileIDs,
        amountTextScanned,
        areAllTextScansReady,

    } = useContext(BatchContext)

    const [ isKeywordBiasStrict, setIsKeywordBiasStrict ] = useState(false)





    useEffect(() => {

        setSelectedFilters(previouslySelectedFilters)

    }, [previouslySelectedFilters, setSelectedFilters])
    


    function handleRemoveFilter(index : number) {

        const temp = [...selectedFilters].filter((filter, someIndex) => someIndex !== index)

        setCurrentDegreeLevel(null)
        
        setSelectedFilters(temp)
        
    }



    function handleChangeCountryFilter(newCountry : string) {



    }



    function handleChangeKeywordBiasFilter(newBias : string, isStrict : boolean) {


        
    }



    function handleChangedHasWorkedAtFilter(newHasWorked : string) {


        
    }



    function handleChangeYearsOfExperienceFilter(newNumYears : number, isCurrentlyWorking : boolean) {


        
    }









    return (
        <Stack
            width={"100vw"}
            height={"100vh"}
            direction={"column"}
            overflow={"auto"}
        >

            <LoadingSnackbar
                isLoading={!areAllTextScansReady}
                loadingPercent={100 * amountTextScanned / fileIDs.length}
            />

            <FilterScreenHeaderButtons />
            
            { !areAllTextScansReady &&
            <LinearProgress
                sx={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    bottom: 0
                }}
                variant='determinate'
                value={100 * amountTextScanned / fileIDs.length}
            />
            }

            <Stack
                direction={"row"}
                justifyContent={"space-between"}
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
                    height={"100%"}
                >
                    <Stack
                        sx={{
                            flexDirection: "column",
                            height: "90vh",
                            position: "sticky",
                            top: 20,
                        }}
                    >

                        <Typography
                            sx={{
                                minHeight: "2.3em",
                                fontSize: "2.3em",
                                textAlign: "center",
                            }}
                        >
                            Current Filter Layers:
                        </Typography>

                        <Box
                            sx={{
                                padding: "0.333em",
                                flexGrow: 1,
                                overflow: "auto"
                            }}
                        >

                            <List>
                                <DraggableList
                                    uniqueIDItems={selectedFilters}
                                    setUniqueIDItems={setSelectedFilters}
                                    onDelete={(index) => handleRemoveFilter(index)}
                                    ItemCard={FilterLayerCard}
                                    className="h-[10em] overflow-x-clip"
                                />
                            </List>

                        </Box>

                    </Stack>

                </Stack>



                <Stack
                    direction={"column"}
                    sx={{
                        backgroundColor: palette.background.paper,
                        borderStartStartRadius: 40,
                        px: "2.3vw",
                        py: "2.3vh",
                        pb: "5em"
                    }}
                    overflow={"clip"}
                    height={"100%"}
                    width={"50%"}

                >

                    <Typography
                        sx={{
                            fontSize: "2.3em",
                            textAlign: "center"
                        }}
                    >
                        Add Filters
                    </Typography>

                    <Stack
                        direction={"column"}
                        gap={"5rem"}
                        minHeight={"75%"}
                    >

                        <DegreeFilter 
                            selectedFilters={selectedFilters}
                            setSelectedFilters={setSelectedFilters}
                        />
                            
                        <YearsOfWorkExperienceFilter
                            selectedFilters={selectedFilters}
                            setSelectedFilters={setSelectedFilters}
                        />

                        <Stack
                            direction={"row"}
                            flexWrap={"wrap"}
                            gap={"5em"}
                        >
                                
                            <CandidateHasWorkedAtFilter
                                selectedFilters={selectedFilters}
                                setSelectedFilters={setSelectedFilters}
                            />

                            <CandidateCountryFilter 
                                selectedFilters={selectedFilters}
                                setSelectedFilters={setSelectedFilters}
                            />

                            <KeywordBiasFilter 
                                selectedFilters={selectedFilters}
                                setSelectedFilters={setSelectedFilters}
                            />

                        </Stack>

                    </Stack>
                        
                </Stack>

            </Stack>

        </Stack>

    )

}

export default FilterScreen