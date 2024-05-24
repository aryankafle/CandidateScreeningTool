import { uploadResumeToDatabase } from "../../requests/ResumeRequests";


import { useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import UserContext from "../../context/UserContext";
import FlagContext from "../../context/FlagContext"
import SelectionContext from "../../context/SelectionContext";
import BatchContext from "../../context/BatchContext";



import { useTheme } from "@mui/material"; 
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography"
import List from "@mui/material/List";

import { UploadCard } from "../../components/list-cards/UploadCard";
import { FileUploadButton } from "../../components/buttons/FileUploadButton";
import { ConfirmDeleteFilesModal, ConfirmFilesModal, NotEnoughFilesModal } from "../../components/modals/ConfirmModals";
import { LoadingModal } from "../../components/modals/LoadingModal";
import { mean } from "simple-statistics";





const ResumeUploadScreen = () => {

    const navigate = useNavigate()
    const { palette } = useTheme()



    const [showConfirmFilesModal, setShowConfirmFilesModal] = useState(false)
    const toggleConfirmFilesModal = () => setShowConfirmFilesModal(prevOpen => !prevOpen)

    const [showDeleteFilesConfirmModal, setShowDeleteFilesConfirmModal] = useState(false)
    const toggleDeleteFilesConfirmModal = () => setShowDeleteFilesConfirmModal(prevOpen => !prevOpen)



    const [selectedIndices, setSelectedIndices] = useState<number[]>([])



    const {

        uploadedFiles,
        setUploadedFiles,

    } = useContext(SelectionContext)

    const {
        setFileIDs,
        fileProgresses,
        setFileProgresses
    } = useContext(BatchContext)



    const loadingPercent = useMemo(() => {

        const avgs = fileProgresses.map(progress => (progress.uploadProgress + progress.downloadProgress)/2)

        const loadingPercent = avgs.length > 0 ? mean(avgs) : 0

        return loadingPercent

    }, [fileProgresses])
    
    const { flags, updateFlag } = useContext(FlagContext)
    const { userData } = useContext(UserContext)
    const { loadingState, setLoadingState } = useContext(FlagContext)

    const hasEnoughResumes = flags.active.includes('enough resumes')





    useEffect(() => {

        if(uploadedFiles.length < 2) {

            updateFlag({flag: 'enough resumes', action: "deactivate"})

            return;
            
        }

        updateFlag({flag: 'enough resumes', action: "activate"})

    }, [uploadedFiles, updateFlag])





    const handleFileUpload = (event : React.ChangeEvent<HTMLInputElement>) => {

        event.preventDefault()

        if(!event.target.files) return;





        const eventFiles : File[] = [...event.target.files]
        const uniqueFiles : File[] = [...uploadedFiles]

        for(let i = 0; i < eventFiles.length; i++) {
            
            if(uniqueFiles.some((file) => file.name === eventFiles[i].name)) {
                continue;    
            }

            uniqueFiles.push(eventFiles[i])
        
        }



        setUploadedFiles(uniqueFiles)

    }



    const getFileIds = useCallback(async () => {

        const fileIDPromises = Promise.allSettled(
            uploadedFiles
            .map(async (file, index) => uploadResumeToDatabase(file, userData.id,
                (uploadPercent : number) => {

                    setFileProgresses(prevProgresses => {
                        
                        const temp = [...prevProgresses]
                        temp[index].uploadProgress = uploadPercent

                        return temp

                    })

                },
                (downloadPercent : number) => {

                    setFileProgresses(prevProgresses => {
                        
                        const temp = [...prevProgresses]
                        temp[index].downloadProgress = downloadPercent

                        return temp

                    })
                    
                }
        )))

        const fileIDSettleResults = await fileIDPromises

        for(const settleResult of fileIDSettleResults) {

            if(settleResult.status === "fulfilled") {

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

        navigate("/filter")

    }, [getFileIds, navigate, setLoadingState])



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
            toggleDeleteFilesConfirmModal()
        }

        if(event.key === "Escape") {
            setSelectedIndices([])
        }

        if(event.ctrlKey && event.key === "a") {
            setSelectedIndices(new Array(uploadedFiles.length))
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
        >

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
                onClose={() => {
                    toggleDeleteFilesConfirmModal()
                    handleDeleteSelection()
                }}
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
                    height={"100%"}
                    gap={"1.5em"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    direction={"column"}
                >

                    <FileUploadButton
                        onUpload={handleFileUpload}
                    />
            
                    <Button
                        fullWidth
                        variant="outlined"
                        onMouseDown={toggleConfirmFilesModal}
                    >
                        <Typography
                            sx={{
                                fontSize: "2vw"
                            }}
                        >
                            Filter Resumes
                        </Typography>
                    </Button>

                </Stack>

                <List
                    sx={{
                        minWidth: "10em",
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
                            
                            onSelect={(index) => handleToggleSelect(index)}
                            onDelete={(index) => handleDeleteFile(index)}

                            isSelected={selectedIndices.includes(index)}

                        />
                        { index < uploadedFiles.length-1 && <Divider /> }
                    </Box>
                    ))}

                    { uploadedFiles.length < 1 &&
                    <Typography
                        textAlign={"center"}
                        p={"1em"}
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