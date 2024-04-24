import { IonIcon } from "@ionic/react"
import { cloudUploadOutline, helpCircleOutline } from 'ionicons/icons';
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from '../../components/buttons/ImprovedButtonComponent'
import Modal from '../../components/modals/Modal';
import ViewFilePopup from "../../components/modals/ViewFilePopup";
import { useSelectableList } from "../../hooks/SelectableList";
import Input from "../../components/forms/InputBox";
import { uploadFilesToDatabase } from "../../requests/ResumeRequests";
import { UserContext } from "../../context/UserContext";
import { FlagContext } from "../../context/FlagContext"
import { SelectionContext } from "../../context/SelectionContext";
import { SavedList } from "../../utils/SavedList";





const ResumeUploadScreen = () => {

    const navigate = useNavigate()
    
    const selectionContext = useContext(SelectionContext)
    const { flags, updateFlag } = useContext(FlagContext)

    const { userData } = useContext(UserContext)

    const hiddenFileInput = useRef<HTMLInputElement>(null)

    const [inputtedBatchName, setInputtedBatchName] = useState(selectionContext.currentBatchName)

    const [showFileModal, setShowFileModal] = useState(false)
    const [showConfirmFilesModal, setShowConfirmFilesModal] = useState(false)

    const [currentlyOpenedIndex, setCurrentlyOpenedIndex] = useState(0)

    const { loadingState, setLoadingState } = useContext(FlagContext)

    const [ instructionsPanelClicked, setInstructionsPanelClicked ] = useState(false)

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

    } = useSelectableList<File>(selectionContext.uploadedFiles, selectionContext.setUploadedFiles)





    useEffect(() => {

        selectionContext.setCurrentBatchId(crypto.randomUUID())
        selectionContext.setCurrentBatchName("")

        selectionContext.setSelectedFilters([])
        selectionContext.setCurrentSavedList({} as SavedList)

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])



    useEffect(() => {
        
        let formData = new FormData()
        for(let i = 0; i < selectionContext.uploadedFiles.length; i++) {
            formData.append("files", selectionContext.uploadedFiles[i])
        }

        selectionContext.setCurrentFormData(formData)

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectionContext.uploadedFiles])



    useEffect(() => {

        if(selectionContext.currentBatchName === "") {

            updateFlag({flag: 'batch name set', action: "deactivate"})

            return;

        }

        updateFlag({flag: 'batch name set', action: "activate"})

    }, [selectionContext.currentBatchName, updateFlag])

    useEffect(() => {

        if(selectionContext.uploadedFiles.length < 2) {

            updateFlag({flag: 'enough resumes', action: "deactivate"})

            return;
            
        }

        updateFlag({flag: 'enough resumes', action: "activate"})

    }, [selectionContext.uploadedFiles, updateFlag])





    const handleFileUpload = (event : React.ChangeEvent<HTMLInputElement>) => {

        event.preventDefault()

        if(!event.target.files) return;





        const eventFiles : File[] = [...event.target.files]
        const uniqueFiles : File[] = [...selectionContext.uploadedFiles]

        for(let i = 0; i < eventFiles.length; i++) {
            
            if(uniqueFiles.some((file) => file.name === eventFiles[i].name)) {
                continue;    
            }

            uniqueFiles.push(eventFiles[i])
        
        }



        selectionContext.setUploadedFiles(uniqueFiles)

    }



    const handleUploadClick = () => {
        if(hiddenFileInput.current){
            hiddenFileInput.current.click()
        }
    }



    function handleAddFiltersClick() {
        setShowConfirmFilesModal(true)
    }



    async function handleConfirmModal() {

        setLoadingState(true);

        await uploadFilesToDatabase(selectionContext.currentFormData, selectionContext.currentBatchId, userData.id, selectionContext.currentBatchName);

        setShowConfirmFilesModal(false);

        selectionContext.setPreviouslySavedFiles([...selectionContext.uploadedFiles])

        navigate("/filter");

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

        if(!flags.active.includes('enough resumes')) {

            return (

                <div className="bg-white dark:bg-grayDark
                                    flex flex-col self-center text-3xl text-white">

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

            );

        }



        if(!flags.active.includes('batch name set')) {

            return (

                <div className="bg-white dark:bg-grayDark
                                flex flex-col self-center text-3xl text-white">

                    <div className="flex flex-col h-[15%] px-[2.3rem] pt-[1.3rem] pb-[1rem]">
                        {`Please enter a batch name!`}
                    </div>

                    <div className="flex flex-row w-[100%] h-[15%] justify-center px-[13rem] pb-[0.5rem]">
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

            )

        }



        return (
            <div className="bg-white dark:bg-grayDark
                                flex flex-col self-center text-3xl">

                { !loadingState ? 
                <>
                    <div className="flex flex-row justify-center h-[15%] px-[2.3rem] pt-[1.3rem] pb-[1rem] text-grayMid">
                        {`Are you sure you want to use batch "${selectionContext.currentBatchName}" of resumes?`}
                    </div>

                    <div className="flex flex-col flex-grow mx-[4rem] mb-[0.6rem] overflow-y-auto text-black dark:text-grayLight">
                        {selectionContext.uploadedFiles.map((file) => (
                            <div key={file.name} className="flex flex-row justify-center mx-2 py-[1rem]">
                                {file.name}
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-row w-[100%] h-[10%] justify-between px-[13rem] pb-[0.5rem]">
                        <Button
                            className="flex flex-col justify-center bg-white dark:bg-gray px-[2rem] py-[0.3rem]"
                            onClick={handleConfirmModal}
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
                    </div>
                </>
                :
                <div className="flex justify-center text-8xl text-white bg-none dark:bg-none">
                    Loading...
                </div>
                }

            </div>
        )
    }



    const FileCard = (props: {index: number}) => {
        return (

            <div className="text-black hover:bg-black/25
                            dark:text-white flex flex-row 
                            px-[3rem] py-[3rem] text-xl border-b-2 last:border-none"
                            
                            onClick={(event) => {
                                handleSelectionOnClick(event, props.index)
                            }}>

                <div 
                    className={
                        selectableItems[props.index].isSelected ?
                            `text-black border-black
                            dark:text-white underline font-bold
                            flex-grow select-none cursor-pointer`
                        :
                            `text-black border-black
                            dark:text-white no-underline font-normal
                            flex-grow select-none cursor-pointer`
                    }
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

    const InstructionPanel = () => {
        return(
            <div className="bg-white dark:bg-grayDark
                            flex flex-col self-center text-3xl
                            max-w-5xl">
                <div className="flex justify-center text-white p-10">
                    Upload resumes on this page. Enter a batch name, or a name for the list of resumes you will be inputting. 
                    The app will take resumes of types PDF, Word doc/x, PNG, and JPG. After inputting the resumes, you will
                    be able to select resumes, clear the selection, and delete them from the list if you do not want them. 
                    There is also an option to open the files for a simple document view to get a final look at the resumes 
                    you want to input. Once you are happy with the uploaded resumes, click "Add Filters to Uploaded Files"
                    at the bottom of the screen to proceed to the next step.
                </div>

                <Button className="flex flex-col justify-center text-black dark:text-white pb-3" onClick={()=> setInstructionsPanelClicked(false)}>
                    OK
                </Button>
            </div>
        )
    }



    return (
        <div className="dark:bg-grayDark bg-white justify-center
                        flex flex-col flex-grow">
            
            { showFileModal && 
            <Modal 
                modalTrigger={showFileModal}
                onClose={()=>{setShowFileModal(false)}}
            >
                <ViewFilePopup
                    onXClicked={()=>{setShowFileModal(false)}}
                    uploadedFiles={selectionContext.uploadedFiles}
                    currentlySelectedIndex={currentlyOpenedIndex}
                />
            </Modal>
            }
            


            { !flags.active.includes('batch name set') ?   
            <div className="dark:border-white dark:text-white text-3xl
                            border-black text-black hover:bg-grayMidDark
                            border-[0.1rem] flex flex-col self-center gap-[0.5rem] p-[0.7rem] mt-[1.5rem]">
                <div className="flex flex-row justify-center text-white text-3xl">
                    Upload a batch of resumes.
                    <IonIcon className="text-4xl text-white flex flex-col justify-center ml-2" icon={helpCircleOutline} onClick={() => setInstructionsPanelClicked(true)} />
                </div>
                {instructionsPanelClicked && 
                    <Modal modalTrigger={instructionsPanelClicked} onClose={()=>{setInstructionsPanelClicked(false)}}>
                        <InstructionPanel />
                    </Modal>
                }

                <Input 
                    title={"Batch Name:"}
                    placeholder={"Batch A-1"}
                    value={inputtedBatchName}
                    onChange={(event) => { setInputtedBatchName(event.target.value)}}
                    onSubmit={() => { selectionContext.setCurrentBatchName(inputtedBatchName) }}
                />
            </div>
            :     
            <>
                <div className="dark:border-white dark:text-white text-lg
                                    border-black text-black hover:bg-grayMidDark
                                border-[0.1rem] flex flex-col self-center gap-[0.5rem] p-[0.7rem] mt-[1.5rem]">
                    <div className="flex flex-row justify-center text-white text-3xl">
                        Change batch name. 
                        <IonIcon className="text-4xl text-white flex flex-col justify-center ml-2" icon={helpCircleOutline} onClick={() => setInstructionsPanelClicked(true)} />
                    </div>
                    {instructionsPanelClicked && 
                        <Modal modalTrigger={instructionsPanelClicked} onClose={()=>{setInstructionsPanelClicked(false)}}>
                            <InstructionPanel />
                        </Modal>
                    }
                    
                        <Input 
                            title={"Batch Name:"}
                            placeholder={"Batch A-1"}
                            value={inputtedBatchName}
                            onChange={(event) => { setInputtedBatchName(event.target.value)}}
                            onSubmit={() => { selectionContext.setCurrentBatchName(inputtedBatchName) }}
                    />
                </div>                 
                <div className="flex justify-center">
                    <Button 
                        className=" dark:border-white dark:text-white text-lg
                                    border-black text-black hover:bg-grayMidDark
                                    border-[0.1rem] flex justify-between gap-[0.5rem] p-[0.7rem] mt-[1.5rem]"
                        onClick={handleUploadClick}
                    >
                        <IonIcon className = "pt-[0.3rem]" icon = {cloudUploadOutline} />
                        { selectionContext.currentBatchName ? `Upload Files to ${selectionContext.currentBatchName}` : `Upload Files`  }
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
            </>
            }



            <div className="flex flex-grow flex-col min-h-[20rem] h-[0] mt-[1.5rem] overflow-auto">

                <ul className=" self-center flex-grow overflow-y-auto min-w-[35rem] w-[60vw]">
                { selectableItems.map( (selectable, index : number) => (
                    <FileCard
                        index={index}
                        key={selectable.id}
                    />
                ))}
                </ul>

                <div className="h-[5rem]
                                text-black
                                dark:text-white
                                self-center
                                text-lg">
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
                    <Button 
                        onClick={() => selectAll()}
                        className="my-[1.5rem] hover:text-grayLight"
                    >
                        { selectableItems.length > 0 ? "Select All" : "" }
                    </Button>
                    }
                </div>

            </div>



            <div className="flex justify-center">

                <Button
                    // className=" dark:border-white dark:text-white dark:hover:bg-grayMidDark
                    //             border-black text-black hover:bg-grayMidDark
                    //             flex justify-center p-[1rem] mb-[4rem] border-[0.1rem] text-lg"
                    className={
                        selectionContext.uploadedFiles.length > 1 ?
                            `dark:border-white dark:text-white dark:hover:bg-grayMidDark
                            border-black text-black hover:bg-grayMidDark animate-pulse
                            flex justify-center p-[1rem] mb-[4rem] border-[0.1rem] text-lg`
                        :
                            `dark:border-white dark:text-white dark:hover:bg-grayMidDark
                            border-black text-black hover:bg-grayMidDark
                            flex justify-center p-[1rem] mb-[4rem] border-[0.1rem] text-lg`
                    }
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
                    <ConfirmFilesPanel />
                </Modal>
            }

        </div>
    )
}

export default ResumeUploadScreen