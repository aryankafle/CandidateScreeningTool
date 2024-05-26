import { useContext, useEffect, useMemo, useRef } from 'react';
import React from 'react';

import BatchContext from '../../context/BatchContext';
import SelectionContext from '../../context/SelectionContext';



import { useTheme } from "@mui/material"; 

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography"
import LinearProgress from '@mui/material/LinearProgress';

import { FilterScreenHeaderButtons } from '../../components/UI/FilterScreenHeaderButtons';
import { LoadingSnackbar } from '../../components/modals/LoadingSnackbar';
import { DegreeFilter } from '../../components/filters/DegreeFilterComponent';
import { YearsOfWorkExperienceFilter } from '../../components/filters/YearsOfWorkExperienceFilter';
import { CandidateHasWorkedAtFilter } from '../../components/filters/CandidateHasWorkedAtFilterComponent';
import { CandidateCountryFilter } from '../../components/filters/CandidateCountryFilterComponent';
import { KeywordBiasFilter } from '../../components/filters/KeywordBiasFilterComponent';
import { DraggableFiltersView } from '../../components/views/DraggableFiltersView';
import { Filter } from '../../utils/Filter';





const FilterScreen = () => {

    const filterCache = useRef<Filter[]>()

    const { palette } = useTheme()

    const {

        selectedFilters,
        setSelectedFilters,

    } = useContext(SelectionContext)
    
    const {

        fileIDs,
        amountTextScanned,
        areAllTextScansReady,

    } = useContext(BatchContext)





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
                            minHeight: "90vh",
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

                        <DraggableFiltersView
                            selectedFilters={selectedFilters}
                            setSelectedFilters={setSelectedFilters}
                        />

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