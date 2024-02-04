import { IonIcon } from "@ionic/react"
import { cloudUploadOutline } from 'ionicons/icons';
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { FileContext } from "../../context/FileContext";
import { useNavigate } from "react-router-dom";
import Button from '../../components/buttons/ImprovedButtonComponent'
import Modal from '../../components/modals/Modal';
import ViewFilePopup from "../../components/modals/ViewFilePopup";
import { useSelectableList } from "../../hooks/SelectableList";





const ResumeUploadScreen = () => {

    const navigate = useNavigate()
    
    const fileContext = useContext(FileContext)

    const hiddenFileInput = useRef<HTMLInputElement>(null)

    const [showModal, setShowModal] = useState(false)

    const [currentlyOpenedIndex, setCurrentlyOpenedIndex] = useState(0)

    const {

        selectableItems,

        getAllItems,
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







    const handleFileUpload = useCallback((event : React.ChangeEvent<HTMLInputElement>) => {

        if(!event.target.files) return;



        const fileNames = fileContext.uploadedFiles.map((file) => file.name)
        const uniqueFiles = [...fileContext.uploadedFiles]

        const eventFiles = [...event.target.files]

        eventFiles.forEach(file => {
            if(!fileNames.includes(file.name)) {
                uniqueFiles.push(file)
            }
        });



        fileContext.setUploadedFiles(uniqueFiles)
        
    }, [fileContext])



    const handleUploadClick = () => {
        if(hiddenFileInput.current){
            hiddenFileInput.current.click()
        }
    }



    function handleAddFiltersClick() {
        fileContext.setUploadedFiles(getAllItems)
        
        navigate("/filter")
    }



    const handleKeyDown = useCallback((event : KeyboardEvent) => {
        if(event.key === "Delete") {
            removeCurrentSelectionFromList()
        }
        else {
            handleSelectionOnKeyDown(event)
        }
    }, [handleSelectionOnKeyDown, removeCurrentSelectionFromList])

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown)

        return () => {
            window.removeEventListener("keydown", handleKeyDown)
        }

    }, [handleKeyDown])





    const FileCard = (props: {index: number}) => {
        return (
            <div className="border-black text-black
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
                    onClick={() => { setShowModal(!showModal); setCurrentlyOpenedIndex(props.index)}}
                >
                    Open File
                </div>
            </div>
        )
        
    }



    return (
        <div className="dark:bg-blue bg-white justify-center
                        flex flex-col flex-grow">
            <Modal 
                modalTrigger={showModal}
                onClose={()=>{setShowModal(false)}}
            >
                <ViewFilePopup
                    onXClicked={()=>{setShowModal(false)}}
                    uploadedFiles={fileContext.uploadedFiles}
                    currentlySelectedIndex={currentlyOpenedIndex}
                />
            </Modal>
            <div className="flex justify-center">
                <Button 
                    className=" dark:border-white dark:text-white
                                border-black text-black
                                border-[0.1rem] flex justify-between gap-[0.5rem] p-[0.7rem] mt-[1.5rem]"
                    onClick={handleUploadClick}
                >
                    <IonIcon className = "pt-[0.3rem]" icon = {cloudUploadOutline} />
                    Upload Files
                    <input
                        accept=".doc,.docx,.pdf,.png,.jpg"
                        type="file"
                        multiple
                        hidden
                        ref={hiddenFileInput}
                        onChange={(event) => {handleFileUpload(event)}}
                    />
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
                                className=" text-black
                                            dark:text-white
                                            flex-grow self-center"
                                onClick={() => { removeCurrentSelectionFromList(); } }
                            >
                                            Remove Selected Files
                            </Button>
                            <Button
                                className=" text-black
                                            dark:text-white
                                            flex-grow self-center"
                                onClick={() => { clearSelection(); } }
                            >
                                            Clear Selection
                            </Button>
                        </div>
                    :
                        <Button onClick={() => selectAll()}
                                className="my-[1.5rem]"
                        >
                            { selectableItems.length > 0 ? "Select All" : ""}
                        </Button>
                    }
                </div>
            </div>
            <div className="flex justify-center">
                <Button
                    className=" dark:border-white dark:text-white
                                border-black text-black
                                flex justify-center p-[1rem] mb-[4rem] border-[0.1rem]"
                    onClick={()=>handleAddFiltersClick()}
                >
                    Add Filters to Uploaded Files
                </Button>
            </div>
        </div>
    )
}

export default ResumeUploadScreen