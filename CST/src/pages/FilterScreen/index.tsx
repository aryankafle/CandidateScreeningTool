import { useState, useContext, useEffect, useCallback } from 'react';
import React from 'react';
import { useNavigate } from 'react-router-dom';



import BatchContext from '../../context/BatchContext';
import FlagContext from '../../context/FlagContext';
import SelectionContext from '../../context/SelectionContext';
import UserContext from '../../context/UserContext';

import { createResumeResult, runTextScanOnFile } from '../../requests/ResumeRequests';

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

import { runPromisesInParallel } from "../../utils/ParallelPromises"



import { useTheme } from "@mui/material"; 

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography"
import List from "@mui/material/List";
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';
import Box from '@mui/material/Box';
import Switch from '@mui/material/Switch';
import Snackbar from '@mui/material/Snackbar';
import LinearProgress from '@mui/material/LinearProgress';
import CircularProgress from '@mui/material/CircularProgress';

import { FilterLayerCard } from '../../components/list-cards/FilterCard';
import { FilterSlider } from '../../components/filters/FilterSlider';
import DraggableList from '../../components/views/DraggableList/';
import FilterSwitch from '../../components/filters/FilterSwitch';
import { FilterTextInput } from '../../components/filters/FilterTextInput';
import { FilterScreenHeaderButtons } from '../../components/UI/FilterScreenHeaderButtons';
import Result from '../../utils/Result';





const FilterScreen = () => {

    const navigate = useNavigate()

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
        setBatchResults

    } = useContext(BatchContext)

    const { userData } = useContext(UserContext)

    const [ isKeywordBiasStrict, setIsKeywordBiasStrict ] = useState(false)





    useEffect(() => {

        setSelectedFilters(previouslySelectedFilters)

    }, [previouslySelectedFilters, setSelectedFilters])
    


    function handleRemoveFilter(index : number) {

        const temp = [...selectedFilters].filter((filter, someIndex) => someIndex !== index)

        setCurrentDegreeLevel(null)
        
        setSelectedFilters(temp)
        
    }



    async function handleRunSelectedFilters() {

        let accumulatedResults : Result[] = [] 

        const promises = fileIDs.map(async fileID => { 

            const result = await createResumeResult(selectedFilters, fileID, userData.id)

            accumulatedResults.push(result)
            setBatchResults(accumulatedResults)

        })

        await runPromisesInParallel(promises)

        navigate("/results")

    }




    return (
        <Stack
            width={"100vw"}
            height={"100vh"}
            direction={"column"}
            overflow={"auto"}
        >

            { !areAllTextScansReady &&
            <Snackbar
                open={(!areAllTextScansReady)}
                message={`Creating Text Scans... ${amountTextScanned} / ${fileIDs.length}`}
                action={
                    <CircularProgress
                        size={"1.6em"}
                        sx={{
                            alignSelf: "center",
                            mx: "1.3em"
                        }}
                    />
                }
                sx={{
                    m: "1em",
                }}
            />
            }

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

                        <Stack
                            pb={"1rem"}
                        >

                            <Typography
                                sx={{
                                    fontSize: "1.3em",
                                    pb: "0.5em"
                                }}
                            >
                                    Degree Level
                            </Typography>

                            <ToggleButtonGroup
                                size='large'
                                value={currentDegreeLevel}
                                onChange={(event) => {

                                    const chosen = event.currentTarget.ariaLabel as Degree

                                    setCurrentDegreeLevel(chosen)

                                    const index = selectedFilters.findIndex(filter => filter.type === 'degree')

                                    const filter = generateHasDegreeLevelFilter(event.currentTarget.ariaLabel as Degree)

                                    if(index > -1) {


                                        setSelectedFilters(prevFilters => {

                                            const temp = [...prevFilters]
                                            temp[index] = filter
                                            return temp

                                        })

                                        return;

                                    }

                                    setSelectedFilters(prevFilters => [...prevFilters, filter])

                                }}
                                exclusive={true}
                            >
                                
                                <ToggleButton aria-label={"associate's"} value={"associate's"} key="associates">
                                    Associates
                                </ToggleButton>

                                <ToggleButton aria-label={"bachelor's"} value="bachelor's" key="bachelors">
                                    Bachelors
                                </ToggleButton>

                                <ToggleButton aria-label={"master's"} value="master's" key="masters">
                                    Masters
                                </ToggleButton>

                                <ToggleButton aria-label={"doctoral"} value="doctoral" key="doctorate">
                                    Doctorate
                                </ToggleButton>

                                <ToggleButton aria-label={"any"} value="any" key="any">
                                    Any
                                </ToggleButton>

                            </ToggleButtonGroup>

                        </Stack>
                            
                        <Stack
                            direction={"column"}
                        >

                            <FilterSlider
                                stepSize={1}
                                onChange={(value) => {

                                    const index = selectedFilters.findIndex(filter => filter.type === 'years-of-work-experience')

                                    const filter = generateYearsOfWorkExperienceFIlter(value)

                                    if(index > -1) {


                                        setSelectedFilters(prevFilters => {

                                            const temp = [...prevFilters]
                                            temp[index] = filter
                                            return temp

                                        })

                                        return;

                                    }

                                    setSelectedFilters(prevFilters => [...prevFilters, filter])

                                }}
                                min={0}
                                max={40}
                            >
                                Years of Work Experience
                            </FilterSlider>

                            <FilterSwitch
                                onChange={(checked) => {

                                    const index = selectedFilters.findIndex(filter => filter.type === 'currently-employed')

                                    const filter = generateCandidateCurrentlyEmployedFilter(checked)

                                    if(index > -1) {


                                        setSelectedFilters(prevFilters => {

                                            const temp = [...prevFilters]
                                            temp[index] = filter
                                            return temp

                                        })

                                        return;

                                    }

                                    setSelectedFilters(prevFilters => [...prevFilters, filter])

                                }}
                            >
                                Currently Working?
                            </FilterSwitch>

                        </Stack>

                        <Stack
                            direction={"row"}
                            flexWrap={"wrap"}
                            gap={"5em"}
                        >
                                
                            <FilterTextInput
                                onSubmit={(value) => {

                                    if(selectedFilters.some(filter => filter.type === `company-name-${value}`) ) return;

                                    const companyNameFilter = generateCompanyNameFilter(value)

                                    setSelectedFilters(prevFilters => [...prevFilters, companyNameFilter])
                                
                                }}
                                placeholder='Samsung' 
                            >
                                Candidate Has Worked At:
                            </FilterTextInput>

                            <FilterTextInput
                                onSubmit={(value) => {

                                    if(selectedFilters.some(filter => filter.type === `country-${value}`) ) return;

                                    const countryFilter = generateCandidateCountryFilter(value)

                                    setSelectedFilters(prevFilters => [...prevFilters, countryFilter])
                                
                                }}
                                placeholder='Korea'
                            >
                                Based in Country:
                            </FilterTextInput>

                            <Stack
                                direction={"column"}
                            >

                                <Typography
                                    sx={{
                                        fontSize: "1.1em"
                                    }}
                                    color={palette.grey[900]}
                                    mb={"0.2em"}
                                >
                                    Below, input another keyword to bias.
                                </Typography>

                                <Typography
                                    sx={{
                                        fontSize: "0.8em",
                                        whiteSpace: "wrap"
                                    }}
                                    color={palette.grey[800]}
                                >
                                    Our AI will look for this word, and any words similar in contextual meaning.
                                </Typography>

                                <Typography
                                    sx={{
                                        fontSize: "0.8em",
                                        whiteSpace: "wrap"
                                    }}
                                    color={palette.grey[800]}
                                    mb={"1em"}
                                >
                                    If you wish for this to be a strict search instead, check "strict".
                                </Typography>

                                <FilterTextInput
                                    onSubmit={(value) => {

                                        if(selectedFilters.some(filter => [ `keyword-bias-${value}` as FilterType, `strict-keyword-bias-${value}` as FilterType ].includes(filter.type) ) ) return;

                                        setSelectedFilters(prevFilters => [...prevFilters, generateKeywordBiasFilter(value, isKeywordBiasStrict)])
                                    
                                    }}
                                >
                                    Insert Keyword Bias:
                                </FilterTextInput>

                                <Stack
                                    direction={"row"}
                                >

                                    <Switch
                                        sx={{
                                            alignSelf: "center"
                                        }}
                                        checked={isKeywordBiasStrict}
                                        onChange={(event, checked) => setIsKeywordBiasStrict(checked)}
                                        color='secondary'
                                    />
                                    
                                    <Typography
                                        sx={{
                                            alignSelf: "center"
                                        }}
                                    >
                                        Strict?
                                    </Typography>

                                </Stack>


                            </Stack>

                        </Stack>

                    </Stack>
                        
                </Stack>

            </Stack>

        </Stack>

    )

}

export default FilterScreen