import { IonIcon } from "@ionic/react"
import { cloudUploadOutline, flag } from 'ionicons/icons';
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { FileContext } from '../../context/FileContext';
import { useNavigate } from "react-router-dom";
import Button from '../../components/buttons/ImprovedButtonComponent'
import Modal from '../../components/modals/Modal';
import ViewFilePopup from "../../components/modals/ViewFilePopup";
import { useSelectableList } from "../../hooks/SelectableList";
import Input from "../../components/forms/InputBox";
import { uploadFilesToDatabase } from "../../requests/ResumeRequests";
import { UserContext } from "../../context/UserContext";
import { FlagContext } from "../../context/FlagContext"





const ResumeUploadScreen = () => {

    const navigate = useNavigate()
    
    const fileContext = useContext(FileContext)

    const { userData } = useContext(UserContext)

    const hiddenFileInput = useRef<HTMLInputElement>(null)

    const [batchName, setBatchName] = useState(fileContext.currentBatchName)

    const [showFileModal, setShowFileModal] = useState(false)
    const [showConfirmFilesModal, setShowConfirmFilesModal] = useState(false)

    const [currentlyOpenedIndex, setCurrentlyOpenedIndex] = useState(0)

    const { loadingState, setLoadingState } = useContext(FlagContext)

    const {

        selectableItems,

        // getAllItems,
        // getAllSelectedItems,
        // getAllNotSelectedItems,
        // amountSelected,
        anySelected,

        // previouslySelectedIndex,

        // handleClickSelect,
        // handleCtrlKeySelect,
        // handleShiftClickSelect,

        // toggleItemFromSelection,

        clearSelection,
        selectAll,
        removeCurrentSelectionFromList,

        handleSelectionOnKeyDown,
        handleSelectionOnClick

    } = useSelectableList<File>(fileContext.uploadedFiles, fileContext.setUploadedFiles)






    useEffect(() => {
        
        let formData = new FormData()
        for(let i = 0; i < fileContext.uploadedFiles.length; i++) {
            formData.append("files", fileContext.uploadedFiles[i])
        }

        fileContext.setCurrentFormData(formData)

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fileContext.uploadedFiles])





    useEffect(() => {
        setLoadingState(loadingState)
    }, [loadingState])





    const handleFileUpload = (event : React.ChangeEvent<HTMLInputElement>) => {

        event.preventDefault()

        if(!event.target.files) return;





        const eventFiles : File[] = [...event.target.files]
        const uniqueFiles : File[] = [...fileContext.uploadedFiles]

        for(let i = 0; i < eventFiles.length; i++) {
            
            if(uniqueFiles.some((file) => file.name === eventFiles[i].name)) {
                continue;    
            }

            uniqueFiles.push(eventFiles[i])
        
        }



        fileContext.setUploadedFiles(uniqueFiles)

    }



    const handleUploadClick = () => {
        if(hiddenFileInput.current){
            hiddenFileInput.current.click()
        }
    }



    function handleAddFiltersClick() {
        setShowConfirmFilesModal(true)
    }



    const handleDeleteFiles = useCallback(() => {
        if(window.confirm("Are you sure you want to delete the currently selected files from the batch?")) {
            removeCurrentSelectionFromList()
        }
    }, [removeCurrentSelectionFromList])



    const handleKeyDown = useCallback((event : KeyboardEvent) => {
        if(event.key === "Delete") {
            handleDeleteFiles()

        }
        else {
            handleSelectionOnKeyDown(event)
        }
    }, [handleSelectionOnKeyDown, handleDeleteFiles])

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown)

        return () => {
            window.removeEventListener("keydown", handleKeyDown)
        }

    }, [handleKeyDown])





    const ConfirmFilesPanel = () => {
        return (
            <div className="bg-white dark:bg-blueDark
                                flex flex-col self-center h-[80%] w-[80%]">
                {!loadingState ? 
                    (
                    <><div className="flex flex-col h-[15%] px-[2.3rem] pt-[1.3rem] pb-[1rem] text-grayLight">
                        {`Are you sure you want to use this batch of resumes?`} <br></br>
                        {`Batch Name: ${fileContext.currentBatchName}`}
                    </div><div className="flex flex-col border-[1px] flex-grow mx-[4rem] mb-[0.6rem] overflow-y-auto">
                            {fileContext.uploadedFiles.map((file) => (
                                <div key={file.name} className="mx-2">
                                    {file.name}
                                </div>
                            ))}
                        </div><div className="flex flex-row w-[100%] h-[10%] justify-between px-[13rem] pb-[0.5rem]">
                            <Button
                                className="flex flex-col justify-center bg-white dark:bg-gray px-[2rem] py-[0.3rem]"
                                onClick={async (event) => {
                                    event.preventDefault();

                                    setLoadingState(true);

                                    await uploadFilesToDatabase(fileContext.currentFormData, fileContext.currentBatchId, userData.id, fileContext.currentBatchName);

                                    setShowConfirmFilesModal(false);

                                    navigate("/filter");
                                } }
                            >
                                Yes
                            </Button>
                            <Button
                                className="flex flex-col justify-center bg-white dark:bg-gray px-[2rem] py-[0.3rem]"
                                onClick={() => {
                                    setShowConfirmFilesModal(false);
                                } }
                            >
                                No
                            </Button>
                        </div></>)
                :
                    <div className="flex justify-center text-8xl text-white">
                        Loading...
                    </div>
                }
            </div>
        )
    }



    const FileCard = (props: {index: number}) => {
        return (
            <div className="border-black text-black hover:bg-blueMid
                            dark:border-white dark:text-white
                            flex flex-row border-[0.1rem] px-[2rem]">
                <div 
                    className={
                        selectableItems[props.index].isSelected ?
                            `text-red border-red
                            dark:text-red
                            flex-grow select-none cursor-pointer`
                        :
                            `text-black border-black
                            dark:text-white
                            flex-grow select-none cursor-pointer`
                    }
                    onClick={(event) => {
                        handleSelectionOnClick(event, props.index)
                    }}
                >
                    {selectableItems[props.index].item.name}
                </div>
                <div
                    className="cursor-pointer select-none"
                    onClick={() => { setShowFileModal(!showFileModal); setCurrentlyOpenedIndex(props.index)}}
                >
                    Open File
                </div>
            </div>
        )
        
    }



    return (
        <div className="dark:bg-blueDark bg-white justify-center
                        flex flex-col flex-grow">
            {
                showFileModal && <Modal 
                    modalTrigger={showFileModal}
                    onClose={()=>{setShowFileModal(false)}}
                >
                    <ViewFilePopup
                        onXClicked={()=>{setShowFileModal(false)}}
                        uploadedFiles={fileContext.uploadedFiles}
                        currentlySelectedIndex={currentlyOpenedIndex}
                    />
                </Modal>
            }
            <div className="dark:border-white dark:text-white
                            border-black text-black hover:bg-blueMid
                            border-[0.1rem] flex flex-col self-center gap-[0.5rem] p-[0.7rem] mt-[1.5rem]">
                <div >
                    Upload a batch of resumes.
                </div>
                <Input 
                    title={"Batch Name:"}
                    placeholder={"Batch A-1"}
                    value={batchName}
                    onChange={(event) => { setBatchName(event.target.value)}}
                    onSubmit={() => { fileContext.setCurrentBatchName(batchName) }}
                />
            </div>
            <div className="flex justify-center">
                <Button 
                    className=" dark:border-white dark:text-white
                                border-black text-black hover:bg-blueMid
                                border-[0.1rem] flex justify-between gap-[0.5rem] p-[0.7rem] mt-[1.5rem]"
                    onClick={handleUploadClick}
                >
                    <IonIcon className = "pt-[0.3rem]" icon = {cloudUploadOutline} />
                    { fileContext.currentBatchName ? `Upload Files to ${fileContext.currentBatchName}` : `Upload Files`  }
                    <form 
                        method='POST'
                        encType='multipart/form-data'
                        action='upload'
                    >
                        <input
                            accept=".doc,.docx,.pdf,.png,.jpg"
                            type="file"
                            name="files"
                            multiple
                            hidden
                            ref={hiddenFileInput}
                            onChange={handleFileUpload}
                        />
                    </form>
                </Button>
            </div>
            <div className="flex flex-grow flex-col min-h-[20rem] h-[0] mt-[1.5rem] overflow-auto">
                <ol className=" border-black self-center flex-grow
                                dark:border-white
                                border-[0.1rem] overflow-y-auto min-w-[35rem] w-[60vw]">
                    {selectableItems.map(
                        (selectable, index : number) => (
                            <FileCard
                                index={index}
                                key={selectable.id}
                            />
                        ))}
                </ol>
                <div className="h-[5rem]
                                text-black
                                dark:text-white
                                self-center">
                    { anySelected() ?
                        <div className="flex flex-col my-[1rem]">
                            <Button
                                className=" text-black hover:text-grayLight
                                            dark:text-white
                                            flex-grow self-center"
                                onClick={() => { handleDeleteFiles(); } }
                            >
                                            Remove Selected Files
                            </Button>
                            <Button
                                className=" text-black hover:text-grayLight
                                            dark:text-white
                                            flex-grow self-center"
                                onClick={() => { clearSelection(); } }
                            >
                                            Clear Selection
                            </Button>
                        </div>
                    :
                        <Button onClick={() => selectAll()}
                                className="my-[1.5rem] hover:text-grayLight"
                        >
                            { selectableItems.length > 0 ? "Select All" : ""}
                        </Button>
                    }
                </div>
            </div>
            <div className="flex justify-center">
                <Button
                    className=" dark:border-white dark:text-white
                                border-black text-black hover:bg-blueMid
                                flex justify-center p-[1rem] mb-[4rem] border-[0.1rem]"
                    onClick={()=>handleAddFiltersClick()}
                >
                    Add Filters to Uploaded Files
                </Button>
            </div>
            {
                showConfirmFilesModal && <Modal 
                    modalTrigger={showConfirmFilesModal}
                    onClose={()=>{setShowConfirmFilesModal(false)}}
                >
                    {
                        fileContext.uploadedFiles.length > 2 ? 
                            <ConfirmFilesPanel />
                        :
                            !fileContext.currentBatchName ? 
                            <div className="bg-white dark:bg-blue
                            flex flex-col self-center w-[80%] h-[80%] justify-between">
                                <div className="flex flex-col h-[15%] px-[2.3rem] pt-[1.3rem] pb-[1rem]">
                                    {`Please enter a batch name!`}
                                </div>
                                <div className="flex flex-row w-[100%] h-[15%] justify-center px-[13rem] pb-[0.5rem]">
                                    <Button
                                        className="flex flex-col justify-center w-[50%] bg-white dark:bg-gray px-[2rem] py-[0.3rem]"
                                        onClick={() => {
                                            setShowConfirmFilesModal(false)
                                        }}
                                    >
                                        Ok
                                    </Button>
                                </div>
                            </div>
                            :
                            <div className="bg-white dark:bg-blue
                                            flex flex-col self-center w-[80%] h-[80%] justify-between">
                                <div className="flex flex-col h-[15%] px-[2.3rem] pt-[1.3rem] pb-[1rem]">
                                    {`Please upload at least 2 resumes!`}
                                </div>
                                <div className="flex flex-row w-[100%] h-[20%] justify-center px-[13rem] pb-[0.5rem]">
                                    <Button
                                        className="flex flex-col justify-center bg-white dark:bg-gray px-[2rem] py-[0.3rem]"
                                        onClick={() => {
                                            setShowConfirmFilesModal(false)
                                        }}
                                    >
                                        Ok
                                    </Button>
                                </div>
                            </div>
                    }
                </Modal>
            }
        </div>
    )
}

export default ResumeUploadScreen