import React, { useContext, useEffect, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { Filter } from "../../../utils/Filter";

import BatchContext from '../../../context/BatchContext';
import SelectionContext from "../../../context/SelectionContext";



import { useTheme } from '@mui/material';

import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography"
import StartIcon from '@mui/icons-material/Start';
import CircularProgress from "@mui/material/CircularProgress";

import { BackButton } from "../../buttons/BackButton";
import FlagContext from "../../../context/FlagContext";



export const FilterScreenHeaderButtons = () => {

    const filterCache = useRef<Filter[]>()

    const navigate = useNavigate()

    const { palette } = useTheme()



    const { areAllTextScansReady } = useContext(BatchContext)

    const { flags, updateFlag } = useContext(FlagContext)
    
    const { 

        selectedFilters,

    } = useContext(SelectionContext)

    

    useEffect(() => {

        filterCache.current = [...selectedFilters]

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])



    useEffect(() => {

        if(!filterCache.current) {

            updateFlag({flag: 'filters have changed', action: "activate"})
            return;

        };

        if(selectedFilters.length !== filterCache.current.length) {

            updateFlag({flag: 'filters have changed', action: "activate"})
            return;

        }

        for(const filter of filterCache.current) {

            if(!selectedFilters.some(otherFilter => otherFilter.name === filter.name)) {

                console.log("yeaaa")

                updateFlag({flag: 'filters have changed', action: "activate"})
                return;

            }
            
        }

        updateFlag({flag: 'filters have changed', action: "deactivate"})

    }, [selectedFilters, updateFlag])





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
                    disabled={ !areAllTextScansReady || (selectedFilters.length < 1) }
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