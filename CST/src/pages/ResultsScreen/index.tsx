import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import uFuzzy from "@leeoniya/ufuzzy"

import { useMouse } from "@uidotdev/usehooks";

import { Filter } from "../../utils/Filter";
import { SavedList } from "../../utils/SavedList";
import Result from "../../utils/Result";

import { runPromisesInParallel } from "../../utils/ParallelPromises";

import useWeighedScores from "../../hooks/UseWeighedScores";

import { SavedListsContext } from '../../context/SavedListsContext';
import UserContext from "../../context/UserContext";
import SelectionContext from "../../context/SelectionContext";
import BatchContext from '../../context/BatchContext';
import FlagContext from "../../context/FlagContext";

import {
    
    saveList,
    deleteSavedList,
    getExternalList,
    createResumeResult,
    getResumeResult,
    downloadResume,
    getUserSavedLists,

} from "../../requests/ResumeRequests";



import { Divider, Modal, useTheme } from "@mui/material";

import ButtonGroup from "@mui/material/ButtonGroup";
import FormLabel from "@mui/material/FormLabel";
import Input from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography"
import List from "@mui/material/List";
import { MuiColorInput } from 'mui-color-input'

import { CandidateCard } from "../../components/list-cards/CandidateCard";
import { DocumentViewerModal } from "../../components/modals/FileViewModal";
import { ResultSummary } from "../../components/UI/ResultSummaryComponent";
import { ListAlreadyExistsModal } from "../../components/modals/ListAleadyExistsModal";





const ResultsScreen = () => {

    const navigate = useNavigate()

    const { palette } = useTheme()

    const didRunResultsEffect = useRef(false)

    const [mouse, ref] = useMouse()

    

    const { userData } = useContext(UserContext)

    const { 
        
        currentSavedList,

    } = useContext(SavedListsContext)

    const {

        selectedFilters,

        uploadedFiles,
        setUploadedFiles,
        clearSelectionContext

    } = useContext(SelectionContext)

    const { flags, updateFlag, clearFlags } = useContext(FlagContext)

    const {

        fileIDs,
        batchResults,
        setBatchResults,
        clearBatchContext

    } = useContext(BatchContext)





    const [ title, setTitle ] = useState(currentSavedList?.name || "")
    const [ description, setDescription ] = useState(currentSavedList?.description || "")
    const [ color, setColor ] = useState(currentSavedList?.color || palette.primary.light)
    


    const weighedResults = useWeighedScores(batchResults)
    const onlySuccessfulResults : Result[] = batchResults.filter(result => result !== undefined).map(result => result as Result)

    const [ currentlySelectedResultIndex, setCurrentlySelectedResultIndex ]= useState(-1)
    const [ viewingFile, setViewingFile ] = useState(false)
    
    const currentlySelectedResult = useMemo(() => weighedResults[currentlySelectedResultIndex], [currentlySelectedResultIndex, weighedResults])



    const changeCurrentlySelectedResult = useCallback((newIndex : number) => {

        setCurrentlySelectedResultIndex(prevIndex => {

            if(newIndex > weighedResults.length) return -1;

            if(newIndex < 0) return -1;

            if(prevIndex === newIndex) return -1

            return newIndex

        })

    }, [weighedResults.length])



    const saveCurrentList = useCallback(async () => {
        
        await saveList( title, description, color, onlySuccessfulResults, userData.id )

        clearBatchContext()
        clearSelectionContext()

        clearFlags()

        navigate("/home/saved-lists")

    }, [title, description, color, onlySuccessfulResults, userData.id, clearBatchContext, clearSelectionContext, clearFlags, navigate] )



    const { paramListID } = useParams();





    const getResultsFromFilters = useCallback(async (fileIDs : (string | undefined)[], filters : Filter[]) => {

        const resultPromises = fileIDs
        .map(async fileID => {
            
            if(!fileID) return undefined

            const result = await createResumeResult(filters, fileID, userData.id)

            return result
        
        })
    

        const { successfulValues: results } = await runPromisesInParallel(resultPromises)

        return {results}

    }, [userData.id])



    const getResultsFromPreviousSavedList = useCallback(async (previousList : SavedList) => {
        
        const resultPromises = previousList.file_ids
        .map(async fileID => {

            const result = await getResumeResult(fileID, previousList._id, userData.id)

            return result
        
        })
        
        const filePromises = previousList.file_ids
        .map(async fileID => {

            const result = await downloadResume(fileID, userData.id)

            return result
        })

        const { successfulValues: results } = await runPromisesInParallel(resultPromises)
        const { successfulValues: resumes } = await runPromisesInParallel(filePromises)

        return {results, resumes}

    }, [userData.id])

    const getResultsFromListID = useCallback(async (listID : string) => {

        const savedList = await getExternalList(listID)

        return await getResultsFromPreviousSavedList(savedList)

    }, [getResultsFromPreviousSavedList])



    useEffect(() => {

        if(!flags.active.includes('filters have changed')) return () => {};

        if(flags.active.includes('batch results created')) return () => {};

        if(currentSavedList) {

            return () => {

                getResultsFromPreviousSavedList(currentSavedList).then(({results, resumes}) => {

                    console.log("yea")
    
                    updateFlag({flag: 'batch results created', action: "activate"})
                    updateFlag({flag: 'filters have changed', action: "deactivate"})
    
                    setBatchResults(results)
                    setUploadedFiles(resumes)

                })
                
            }

        }

        if(paramListID) {
            
            return () => {

                getResultsFromListID(paramListID).then(({results, resumes}) => {
    
                    updateFlag({flag: 'batch results created', action: "activate"})
                    updateFlag({flag: 'filters have changed', action: "deactivate"})

                    setBatchResults(results)
                    setUploadedFiles(resumes)
    
                })
                
            }

        }

        return () => {

            getResultsFromFilters(fileIDs, selectedFilters).then(({results}) => {

                updateFlag({flag: 'batch results created', action: "activate"})
                updateFlag({flag: 'filters have changed', action: "deactivate"})

                setBatchResults(results)

            })
            
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])





    return (

        <Box
            p={"1vw"}
            sx={{
                overflowY: "auto",
                overflowX: "hidden"
            }}
            height={"100%"}
            width={"100%"}
        >

            <DocumentViewerModal
                file={uploadedFiles[currentlySelectedResultIndex]}
                open={viewingFile}
                onClose={() => setViewingFile(false)}
            />

            <Stack
                direction={"row"}
                height={"100%"}
            >

                <Stack
                    direction={"column"}
                    width={"55%"}
                >
                    <Box
                        ref={ref}
                        px={"0.8vw"}
                    >

                        <Typography
                            variant="h1"
                            sx={{
                                cursor: "default",
                                userSelect: "none",
                                backgroundcolor: "primary",
                                backgroundImage: `radial-gradient(circle at ${mouse.elementX}px ${mouse.elementY}px, ${palette.secondary.light}, ${palette.secondary.dark})`,
                                backgroundSize: "100%",
                                backgroundRepeat: "repeat",
                                backgroundClip: "text",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                            }}
                        >
                            Candidates
                        </Typography>

                    </Box>

                    <List>
                        <Stack
                            gap={"0.5rem"}
                        >
                        {weighedResults.map((weighedResult, index) => {

                            return (
                            <CandidateCard
                                key={index + ( weighedResult ? weighedResult.applicant.name : Math.random().toString() ) }
                                candidate={weighedResult}
                                isSelected={currentlySelectedResultIndex === index}
                                onSelectCandidate={changeCurrentlySelectedResult}
                                index={index}
                            />     
                            )
                        })}
                        
                        </Stack>
                        

                    </List>

                </Stack>

                <Stack
                    direction={"column"}
                    position={"fixed"}
                    width={"40%"}
                    right={"1vw"}
                >

                {
                currentlySelectedResult ? 
                <ResultSummary
                    result={currentlySelectedResult}
                    index={currentlySelectedResultIndex}
                    onShowOriginal={(index) => setViewingFile(true)}
                    onRerun={(index) => {}}
                />

                :
                <form
                    onSubmit={(event) => {

                        event.preventDefault()

                    }}
                >
                    <Stack
                        height={"100%"}
                        gap={"5vh"}
                        p={"1.5vw"}
                        sx={{
                            backgroundColor: palette.background.paper
                        }}
                    >

                        <Stack
                            direction={"column"}
                        >
                            <FormLabel aria-label="input-name">
                                List Name
                            </FormLabel>
                            <Input
                                type="text"
                                value={title}
                                onChange={ (event) => setTitle(event.target.value) }
                            />
                        </Stack>

                        <Stack
                            direction={"column"}
                        >
                            <FormLabel
                                aria-label="input-description"
                            >
                                List Description
                            </FormLabel>
                            <Input
                                type="text"
                                value={description}
                                onChange={ (event) => setDescription(event.target.value) }
                            />
                        </Stack>

                        <Stack
                            direction={"column"}
                        >
                            <FormLabel 
                                aria-label="input-color"
                            >
                                List Color
                            </FormLabel>
                            <MuiColorInput
                                format="hex8"
                                value={color}
                                onChange={(value) => setColor(value)}
                            />
                        </Stack>

                        <Stack>

                            <ButtonGroup
                                variant="text"
                                aria-label="save-list-button-group"
                                sx={{
                                    alignSelf: "center",
                                    height: "2.3vw",
                                    mb: "1.5vw"
                                }}
                            >

                                <Button
                                    variant="text"
                                    sx={{
                                        px: "1vw"
                                    }}
                                    onMouseDown={() => navigate("/filter")}
                                >
                                    <Typography
                                        sx={{
                                            fontSize: "1vw"
                                        }}
                                    >
                                        Run New Filters
                                    </Typography>
                                </Button>

                                <Button
                                    variant="text"
                                    sx={{
                                        px: "1vw"
                                    }}
                                    onMouseDown={() => navigate("/home/resume-upload")}
                                >   
                                    <Typography
                                        sx={{
                                            fontSize: "1vw"
                                        }}
                                    >
                                        Upload New Batch
                                    </Typography>
                                </Button>

                            </ButtonGroup>

                            <Button
                                type="submit"
                                variant="contained"
                                sx={{
                                    alignSelf: "center",
                                    p: "0.6vw",
                                    px: "2vw"
                                }}
                                onMouseDown={() => saveCurrentList()}
                            >
                                <Typography
                                    sx={{
                                        fontSize: "1vw"
                                    }}
                                >
                                    Save List
                                </Typography>
                            </Button>

                        </Stack>
                        
                    </Stack>
                </form>
                }



                </Stack>

            </Stack>

        </Box>

    )
}

export default ResultsScreen