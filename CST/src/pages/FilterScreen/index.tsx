import { useContext } from 'react';

import SelectionContext from '../../context/SelectionContext';



import { useTheme } from "@mui/material";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { FilterScreenHeaderButtons } from '../../components/UI/FilterScreenHeaderButtons';
import { CandidateCountryFilter } from '../../components/filters/CandidateCountryFilterComponent';
import { CandidateHasWorkedAtFilter } from '../../components/filters/CandidateHasWorkedAtFilterComponent';
import { DegreeFilter } from '../../components/filters/DegreeFilterComponent';
import { KeywordBiasFilter } from '../../components/filters/KeywordBiasFilterComponent';
import { YearsOfWorkExperienceFilter } from '../../components/filters/YearsOfWorkExperienceFilter';
import { DraggableFiltersView } from '../../components/views/DraggableFiltersView';





const FilterScreen = () => {

    const { palette } = useTheme()

    const {

        selectedFilters,
        setSelectedFilters,

    } = useContext(SelectionContext)





    return (
        <Stack
            width={"100vw"}
            height={"100vh"}
            direction={"column"}
            overflow={"auto"}
        >

            <FilterScreenHeaderButtons />

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
                    p={"1vh"}
                    width={"40%"}
                    height={"100%"}
                    boxShadow={10}
                >
                    <Stack
                        sx={{
                            flexDirection: "column",
                            height: "90vh",
                            position: "sticky",
                            top: "2vh",
                            p: "1vw",
                        }}
                    >

                        <Typography
                            sx={{
                                fontSize: "2.5rem",
                                mb: "1vw",
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
                    }}
                    boxShadow={10}
                    p={"2vw"}
                    height={"100%"}
                    width={"50%"}
                >

                    <Typography
                        sx={{
                            fontSize: "3rem",
                            textAlign: "center",
                            mb: "2vh"
                        }}
                    >
                        Add Filters
                    </Typography>

                    <Stack
                        direction={"column"}
                        gap={"13vh"}
                        pb={"10vh"}
                        height={"100%"}
                        overflow={"auto"}
                    >

                        <DegreeFilter 
                            selectedFilters={selectedFilters}
                            setSelectedFilters={setSelectedFilters}
                        />
                            
                        <YearsOfWorkExperienceFilter
                            selectedFilters={selectedFilters}
                            setSelectedFilters={setSelectedFilters}
                        />

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

    )

}

export default FilterScreen