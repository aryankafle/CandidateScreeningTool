import { useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useMouse } from "@uidotdev/usehooks";

import { Filter } from "../../utils/Filter";
import Result from "../../utils/Result";
import { SavedList } from "../../utils/SavedList";

import { runPromisesInParallel } from "../../utils/ParallelPromises";

import useWeighedScores from "../../hooks/UseWeighedScores";

import BatchContext from '../../context/BatchContext';
import FlagContext from "../../context/FlagContext";
import { SavedListsContext } from '../../context/SavedListsContext';
import SelectionContext from "../../context/SelectionContext";
import UserContext from "../../context/UserContext";

import {
    createResumeResult,
    downloadResume,
    getExternalList,
    getResumeResult,
    modifySavedList,
    saveList,
} from "../../requests/ResumeRequests";



import { CircularProgress, useTheme } from "@mui/material";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import FormLabel from "@mui/material/FormLabel";
import List from "@mui/material/List";
import Stack from "@mui/material/Stack";
import Input from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { MuiColorInput } from 'mui-color-input';

import { CandidateCard } from "../../components/list-cards/CandidateCard";
import { DocumentViewerModal } from "../../components/modals/FileViewModal";
import { ResultSummary } from "../../components/UI/ResultSummaryComponent";





const ResultsScreen = () => {

    const navigate = useNavigate()

    const { palette } = useTheme()

    const [mouse, ref] = useMouse()

    const { paramListID } = useParams();

    

    const { userData } = useContext(UserContext)

    const { 
        
        currentSavedList,
        setCurrentSavedList

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
        setFileIDs,

        batchResults,
        setBatchResults,

        clearBatchContext

    } = useContext(BatchContext)





    const [ title, setTitle ] = useState(currentSavedList?.name || "")
    const [ description, setDescription ] = useState(currentSavedList?.description || "")
    const [ color, setColor ] = useState(currentSavedList?.color || palette.primary.light)

    const badInput = useMemo(() => (

        !title ||
        !description ||
        !color

    ), [color, description, title])
    


    const weighedResults = useWeighedScores(batchResults)

    const sortedResultsWithFiles = useMemo(() => {

        let filesAndResults = []

        for(let i = 0; i < weighedResults.length; i++) {

            filesAndResults.push({
                result: weighedResults[i],
                file: uploadedFiles[i]
            })

        }

        filesAndResults.sort( (resA, resB) => {

            if(!resA.result || !resB.result) return 1E9

            return resB.result.overall - resA.result.overall

        })

        return filesAndResults

    }, [uploadedFiles, weighedResults])

    const onlySuccessfulResults : Result[] = batchResults.filter(result => result !== undefined).map(result => result as Result)

    const [ currentlySelectedResultIndex, setCurrentlySelectedResultIndex ]= useState(-1)
    const [ viewingFile, setViewingFile ] = useState(false)
    
    const currentlySelectedResult = useMemo(() => sortedResultsWithFiles[currentlySelectedResultIndex]?.result, [currentlySelectedResultIndex, sortedResultsWithFiles])



    const gettingResults = useRef(false)

    const listMetadataSameAsBefore = useMemo(() => (

        ( currentSavedList?.name === title ) &&
        ( currentSavedList?.description === description) &&
        ( currentSavedList?.color === color)
        
    ), [color, currentSavedList?.color, currentSavedList?.description, currentSavedList?.name, description, title])

    const filtersChanged = useMemo(() => flags.active.includes("filters have changed"), [flags.active])



    const changeCurrentlySelectedResult = useCallback((newIndex : number) => {

        setCurrentlySelectedResultIndex(prevIndex => {

            if(newIndex > weighedResults.length) return -1;

            if(newIndex < 0) return -1;

            if(prevIndex === newIndex) return -1

            return newIndex

        })

    }, [weighedResults.length])



    const savePreviousList = useCallback(async () => {

        if(!currentSavedList) return;
        
        await modifySavedList(currentSavedList, userData.id, title, description, color)

        clearBatchContext()
        clearSelectionContext()

        clearFlags()

        navigate("/home/saved-lists")

    }, [currentSavedList, userData, title, description, color, clearBatchContext, clearSelectionContext, clearFlags, navigate] )

    const saveCurrentList = useCallback(async () => {
        
        await saveList( title, description, color, onlySuccessfulResults, userData.id )

        clearBatchContext()
        clearSelectionContext()

        clearFlags()

        navigate("/home/saved-lists")

    }, [title, description, color, onlySuccessfulResults, userData.id, clearBatchContext, clearSelectionContext, clearFlags, navigate] )





    const getResultsFromFilters = useCallback(async (fileIDs : (string | undefined)[], filters : Filter[]) => {

        const resultPromises = fileIDs
        .map(async fileID => {
            
            if(!fileID) return undefined

            const result = await createResumeResult(filters, fileID, userData.id)

            return result
        
        })
    

        const { successfulValues: results } = await runPromisesInParallel(resultPromises)

        return {results}

    }, [userData])



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

    }, [userData])

    const setCurrentListFromListID = useCallback(async (listID : string) => {

        const savedList = await getExternalList(listID)

        setCurrentSavedList(savedList)

    }, [setCurrentSavedList])



    useEffect(() => {

        if(!filtersChanged) return;

        if(gettingResults.current) return;

        gettingResults.current = true





        if(currentSavedList) {

            getResultsFromPreviousSavedList(currentSavedList).then(({results, resumes}) => {

                gettingResults.current = false

                updateFlag({flag: 'filters have changed', action: "deactivate"})

                setBatchResults(results)
                setUploadedFiles(resumes)

            })

            return;

        }

        if(paramListID) {
            
            setCurrentListFromListID(paramListID)

            return;

        }

    

        getResultsFromFilters(fileIDs, selectedFilters).then(({results}) => {

            gettingResults.current = false

            updateFlag({flag: 'filters have changed', action: "deactivate"})

            setBatchResults(results)

        })

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
                file={sortedResultsWithFiles[currentlySelectedResultIndex]?.file}
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
                            fontSize={"5vw"}
                            sx={{
                                cursor: "default",
                                userSelect: "none",
                                backgroundcolor: "primary",
                                backgroundImage: `radial-gradient(circle at ${mouse.elementX}px ${mouse.elementY}px, ${palette.secondary.dark}, ${palette.background.default})`,
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
                            pb={"8vh"}
                        >

                        {( ( batchResults.length < fileIDs.length ) || gettingResults.current ) &&
                        
                            <Stack
                            
                                mt={"4rem"}
                                p={"2rem"}
                                gap={"0.5rem"}

                            >

                                <Typography
                                    alignSelf={"center"}
                                    fontSize={"1.5rem"}
                                    sx={{
                                        p: "1rem",
                                        borderRadius: 2,
                                        backgroundImage: `radial-gradient(circle at ${mouse.elementX}px ${mouse.elementY}px, ${palette.background.default}, ${palette.secondary.light})`,
                                    }}
                                >

                                    { currentSavedList ? "Fetching results..." : (filtersChanged && batchResults.length > 0) ? "Creating your new results..." : "Creating your results..."}

                                </Typography>

                                <CircularProgress
                                    sx={{
                                        borderRadius: 2,
                                        alignSelf: "center",
                                        m: "2rem",
                                    }}
                                    color="secondary"
                                />

                                <Typography
                                    alignSelf={"center"}
                                    fontSize={"1.2rem"}
                                    color={"gray"}
                                >

                                    Note: Depending on the size of your batch, this may take a few minutes.

                                </Typography>

                            </Stack>
                        
                        }

                        {sortedResultsWithFiles.map((resultAndFile, index) => {

                            return (
                            <CandidateCard
                                key={index + ( resultAndFile.result ? resultAndFile.result.applicant.name : Math.random().toString() ) }
                                candidate={resultAndFile.result}
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
                        position={"fixed"}
                        top={"6rem"}
                        mx={"2rem"}
                        width={"40%"}
                        p={"2rem"}
                        minHeight={"80%"}
                        bottom={"2rem"}
                        boxShadow={6}
                        left={"57.5%"}
                        overflow={"auto"}
                        sx={{
                            backgroundColor: palette.background.paper
                        }}
                    >

                        <Stack
                            direction={"column"}
                            gap={"0.5rem"}
                        >
                            <FormLabel aria-label="input-name">
                                <Typography
                                    fontSize={"1.5rem"}
                                >
                                    List Name
                                </Typography>
                            </FormLabel>
                            <Input
                                type="text"
                                value={title}
                                onChange={ (event) => setTitle(event.target.value) }
                            />
                        </Stack>

                        <Stack
                            direction={"column"}
                            gap={"0.5rem"}
                        >
                            <FormLabel
                                aria-label="input-description"
                            >
                                <Typography
                                    fontSize={"1.5rem"}
                                >
                                    List Description
                                </Typography>
                            </FormLabel>
                            <Input
                                type="text"
                                value={description}
                                onChange={ (event) => setDescription(event.target.value) }
                            />
                        </Stack>

                        <Stack
                            direction={"column"}
                            gap={"0.5rem"}
                        >
                            <FormLabel
                                aria-label="input-description"
                            >
                                <Typography
                                    fontSize={"1.5rem"}
                                >
                                    List Color
                                </Typography>
                            </FormLabel>
                            <MuiColorInput
                                format="hex8"
                                value={color}
                                onChange={(value) => setColor(value)}
                            />
                        </Stack>

                        <Stack
                            mt={"3rem"}
                        >

                            { !paramListID && <ButtonGroup
                                variant="text"
                                aria-label="save-list-button-group"
                                sx={{
                                    alignSelf: "center",
                                    mb: "3rem"
                                }}
                            >

                                <Button
                                    variant="text"
                                    sx={{
                                        px: "1vw"
                                    }}
                                    disabled={( gettingResults.current )}
                                    onMouseDown={() => {

                                        if(currentSavedList) {

                                            setFileIDs(currentSavedList?.file_ids)
                                            setCurrentSavedList(undefined)

                                            updateFlag({flag: "text scans have been created", action: "activate"})

                                        }

                                        navigate("/filter")
                                    
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            fontSize: "2rem"
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
                                    disabled={ ( gettingResults.current ) }
                                    onMouseDown={() => navigate("/home/resume-upload")}
                                >   
                                    <Typography
                                        sx={{
                                            fontSize: "2rem"
                                        }}
                                    >
                                        Upload New Batch
                                    </Typography>
                                </Button>

                            </ButtonGroup> }

                            { currentSavedList ?

                            <Button
                                type="submit"
                                variant="contained"
                                disabled={( listMetadataSameAsBefore || badInput )}
                                sx={{
                                    alignSelf: "center",
                                    p: "0.6vw",
                                    px: "2vw"
                                }}
                                onMouseDown={() => savePreviousList()}
                            >
                                <Typography
                                    sx={{
                                        fontSize: "2rem"
                                    }}
                                >
                                    Save
                                </Typography>
                            </Button>
                            :
                            <Button
                                type="submit"
                                disabled={( listMetadataSameAsBefore || badInput )}
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
                                        fontSize: "2rem"
                                    }}
                                >
                                    Save List
                                </Typography>
                            </Button>
                            
                            }

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