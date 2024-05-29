import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useMouse } from "@uidotdev/usehooks";

import { mean } from "simple-statistics";

import { uploadResumeToDatabase } from "../../requests/ResumeRequests";



import BatchContext from "../../context/BatchContext";
import FlagContext from "../../context/FlagContext";
import SelectionContext from "../../context/SelectionContext";
import UserContext from "../../context/UserContext";



import { useTheme } from "@mui/material";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { FileUploadButton } from "../../components/buttons/FileUploadButton";
import { UploadCard } from "../../components/list-cards/UploadCard";
import { ConfirmDeleteFilesModal, ConfirmFilesModal, NotEnoughFilesModal } from "../../components/modals/ConfirmModals";
import { DocumentViewerModal } from "../../components/modals/FileViewModal";
import { LoadingModal } from "../../components/modals/LoadingModal";





const ResumeUploadScreen = () => {

    const navigate = useNavigate()
    const { palette } = useTheme()

    const [mouse, ref] = useMouse()



    const [showConfirmFilesModal, setShowConfirmFilesModal] = useState(false)
    const toggleConfirmFilesModal = () => setShowConfirmFilesModal(prevOpen => !prevOpen)

    const [showDeleteFilesConfirmModal, setShowDeleteFilesConfirmModal] = useState(false)
    const toggleDeleteFilesConfirmModal = () => setShowDeleteFilesConfirmModal(prevOpen => !prevOpen)



    const [selectedIndices, setSelectedIndices] = useState<number[]>([])



    const {

        clearSelectionContext,

        uploadedFiles,
        setUploadedFiles,

    } = useContext(SelectionContext)

    const {

        clearBatchContext,

        setFileIDs,

        fileProgresses,
        setFileProgresses

    } = useContext(BatchContext)
    
    const { flags, updateFlag, clearFlags } = useContext(FlagContext)
    const { userData } = useContext(UserContext)
    const { loadingState, setLoadingState } = useContext(FlagContext)

    const hasEnoughResumes = flags.active.includes('enough resumes')



    const loadingPercent = useMemo(() => {

        const progresses = fileProgresses.map(progress => ( progress?.uploadProgress || 100 ) )

        const loadingPercent = progresses.length > 0 ? mean(progresses) : 0

        return loadingPercent

    }, [fileProgresses])



    const [openFileIndex, setOpenFileIndex] = useState(-1)

    const handleOpenFile = useCallback((index : number) => setOpenFileIndex(index), [setOpenFileIndex])
    const handleCloseFileModal = useCallback(() => setOpenFileIndex(-1), [setOpenFileIndex])





    useEffect(() => {

        if(uploadedFiles.length < 2) {

            updateFlag({flag: 'enough resumes', action: "deactivate"})

            return;
            
        }

        updateFlag({flag: 'enough resumes', action: "activate"})

    }, [uploadedFiles, updateFlag])



    useEffect(() => {

        clearSelectionContext()
        clearBatchContext()

        clearFlags()

    }, [updateFlag, clearSelectionContext, clearBatchContext, clearFlags])





    const handleFileUpload = (event : React.ChangeEvent<HTMLInputElement>) => {

        event.preventDefault()

        if(!event.target.files) return;





        const eventFiles : File[] = [...event.target.files]
        const uniqueFiles = [...uploadedFiles]

        for(let i = 0; i < eventFiles.length; i++) {
            
            if(uniqueFiles.some((file) => file?.name === eventFiles[i].name)) {
                continue;    
            }

            uniqueFiles.push(eventFiles[i])
        
        }



        setUploadedFiles(uniqueFiles)

    }



    const getFileIds = useCallback(async () => {

        const fileIDPromises = Promise.allSettled(
            uploadedFiles
            .map(async (file, index) => {

                if(!file) return undefined
                
                return await uploadResumeToDatabase(file, userData.id,
                    (uploadPercent : number) => {

                        setFileProgresses(prevProgresses => {
                            
                            const temp = [...prevProgresses]
                            temp[index]!.uploadProgress = uploadPercent

                            return temp

                        })
                    }
                )
            }
        ))

        const fileIDSettleResults = await fileIDPromises

        for(const settleResult of fileIDSettleResults) {

            if(settleResult.status === "fulfilled") {

                if(!settleResult.value) {
                    
                    setFileIDs(previousIDs => [...previousIDs, undefined])
                    return;

                }

                const fileID : string = settleResult.value

                setFileIDs( previousIDs => [...previousIDs, fileID] )

                continue;

            }

            // Do thing with error files here

        }

    }, [setFileIDs, setFileProgresses, uploadedFiles, userData.id])





    const handleConfirmModal = useCallback(async () => {

        setLoadingState(true)

        await getFileIds()

        setShowConfirmFilesModal(false);

        updateFlag({flag: 'uploads have been processed', action: 'activate'})

        navigate("/filter")

    }, [getFileIds, navigate, setLoadingState, updateFlag])



    const handleDeleteSelection = useCallback(() => {

        setUploadedFiles(prevUploaded => prevUploaded.filter((someFile, someIndex) => !selectedIndices.includes(someIndex)))
        setSelectedIndices([])

    }, [selectedIndices, setUploadedFiles])

    const handleToggleSelect = (index : number) => {

        setSelectedIndices(prevIndices => {
            
            if(prevIndices.includes(index)) {

                return prevIndices.filter(someIndex => someIndex !== index)

            }

            return [...prevIndices, index]
            
        })

    }

    const handleDeleteFile = (index : number) => {

        setUploadedFiles(prevUploaded => prevUploaded.filter((someUpload, someIndex) => someIndex !== index))
        setSelectedIndices([])

    }





    const handleKeyDown = useCallback((event : KeyboardEvent) => {
        
        if(event.key === "Delete" && selectedIndices.length > 0) {
            setShowConfirmFilesModal(false)
            toggleDeleteFilesConfirmModal()
        }

        if(event.key === "Escape") {
            setShowConfirmFilesModal(false)
            setShowDeleteFilesConfirmModal(false)
            setSelectedIndices([])
        }

        if(event.ctrlKey && ( event.key === "a" || event.key === "A" ) ) {

            const newarr = new Array(uploadedFiles.length).fill(0)
            const indexarr = newarr.map((elm, index) => index)
            setSelectedIndices(indexarr)

        }

    }, [selectedIndices.length, uploadedFiles.length])

    useEffect(() => {
        
        window.addEventListener("keydown", handleKeyDown)

        return () => {
            window.removeEventListener("keydown", handleKeyDown)
        }

    }, [handleKeyDown])





    return (
        <Box
            width={"100%"}
            height={"100%"}
            overflow={"auto"}
            sx={{
                userSelect: "none",
            }}
        >

            <DocumentViewerModal
                file={uploadedFiles[openFileIndex]}
                open={openFileIndex > -1}
                onClose={handleCloseFileModal}
            />

            <NotEnoughFilesModal
                open={(showConfirmFilesModal && !hasEnoughResumes)}
                onClose={toggleConfirmFilesModal}
            />

            <ConfirmFilesModal
                open={(showConfirmFilesModal && hasEnoughResumes)}
                onClose={toggleConfirmFilesModal}
                onConfirm={handleConfirmModal}
                numUploads={uploadedFiles.length}
            />

            <ConfirmDeleteFilesModal
                open={showDeleteFilesConfirmModal}
                onClose={toggleDeleteFilesConfirmModal}
                onDelete={handleDeleteSelection}
                numSelected={selectedIndices.length}
            />

            <LoadingModal
                isLoading={loadingState}
                loadingPercent={loadingPercent}
            />

            <Stack
                direction={"row"}
                alignItems={"flex-start"}
                width={"100%"}
                height={"100%"}
                justifyContent={"space-around"}
                gap={"5%"}
                paddingY={"5%"}
                paddingX={"5%"}
                sx={{
                    flexGrow: 1,
                }}
            >



                <Stack
                    width={"30%"}
                    minWidth={"rem"}
                    height={"100%"}
                    gap={"2vh"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    direction={"column"}
                >

                    <Box
                        ref={ref}
                    >
                        <Typography
                            sx={{
                                fontSize: "1.5vw",
                                alignSelf: "center",
                            }}
                        >
                            Upload resumes to run through our
                        </Typography>
                        
                        <Typography
                            variant="h1"
                            fontSize={"6vw"}
                            align="left"
                            sx={{
                                cursor: "default",
                                userSelect: "none",
                                backgroundcolor: "primary",
                                backgroundImage: `radial-gradient(circle at ${mouse.elementX}px ${mouse.elementY}px, ${palette.primary.dark}, ${palette.primary.light})`,
                                backgroundSize: "100%",
                                backgroundRepeat: "repeat",
                                backgroundClip: "text",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent"
                            }}
                        >
                            AI Filters
                        </Typography>

                    </Box>


                    <FileUploadButton
                        onUpload={handleFileUpload}
                    />
            
                    <Button
                        fullWidth
                        variant="contained"
                        onMouseDown={toggleConfirmFilesModal}
                    >
                        <Typography
                            sx={{
                                fontSize: "1.5vw"
                            }}
                        >
                            Filter Resumes
                        </Typography>
                    </Button>

                </Stack>

                <List
                    sx={{
                        minWidth: "rem",
                        width: "60%",
                        height: "100%",
                        border: 1,
                        borderColor: palette.divider,
                        borderRadius: 5,
                        direction: "column",
                        overflow: "auto"
                    }}
                >

                    {uploadedFiles.map((file, index) => (
                    <Box
                        key={index + Math.random()*99999}
                    >
                        <UploadCard

                            file={file}
                            index={index}
                            
                            onSelect={handleToggleSelect}
                            onFileOpened={handleOpenFile}
                            onDelete={handleDeleteFile}

                            isSelected={selectedIndices.includes(index)}

                        />
                        { index < uploadedFiles.length-1 && <Divider /> }
                    </Box>
                    ))}

                    { uploadedFiles.length < 1 &&
                    <Typography
                        textAlign={"center"}
                        p={"2vw"}
                        fontSize={"1.5vw"}
                        color={palette.text.disabled}
                    >
                        Please Upload your Files.
                    </Typography>
                    }

                </List>

            </Stack>

        </Box>
    )
}

export default ResumeUploadScreen