import { IonIcon } from "@ionic/react"
import { cloudUploadOutline } from 'ionicons/icons';
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { FileContext } from "../../context/FileContext";
import { useNavigate } from "react-router-dom";
import Button from '../../components/buttons/ImprovedButtonComponent'
import Modal from '../../components/modals/Modal';
import ViewFilePopup from "../../components/modals/ViewFilePopup";





class FileSelection {
    #file: File
    isSelected: boolean

    constructor(file : File) {
        this.#file = file
        this.isSelected = false
    }

    get fileName() {
        return this.#file.name
    }

    get file(){
        return this.#file
    }

    toString() {
        
    }
}





const ResumeUploadScreen = () => {

    const navigate = useNavigate()
    
    const fileContext = useContext(FileContext)

    const hiddenFileInput = useRef<HTMLInputElement>(null)

    const [showModal, setShowModal] = useState(false)



    const [fileSelections, setFileSelections] = useState([] as FileSelection[])
    const [previouslySelectedIndex, setPreviouslySelectedIndex] = useState(0)
    const [currentlySelectedIndex, setCurrentlySelectedIndex] = useState(0)





    // Runs once after page render
    const initFileSelections = useCallback(() => {
        const _init = fileContext.uploadedFiles.map((file) => {return new FileSelection(file)})
        setFileSelections([..._init])
    }, [fileContext])

    /*
        error disabled because this callback is supposed to be static
    */
    useEffect(() => {
        initFileSelections()

    }, [initFileSelections])





    const clearSelection = useCallback(() => {

        const _noneSelected = [...fileSelections]

        for(let i = 0; i < _noneSelected.length; i++) {
            _noneSelected[i].isSelected = false
        }

        setFileSelections([..._noneSelected])

    }, [fileSelections])

    const selectAll = useCallback(() => {

        const _allSelected = [...fileSelections]

        for(let i = 0; i < _allSelected.length; i++) {
            _allSelected[i].isSelected = true
        }

        setFileSelections([..._allSelected])

    }, [fileSelections])



    const removeCurrentSelectionFromUpload = useCallback(() => {

        fileContext.setUploadedFiles(fileSelections.filter((fileSelection) => { return !fileSelection.isSelected }).map((fileSelection) => fileSelection.file))
        
        setCurrentlySelectedIndex(0)
        setPreviouslySelectedIndex(0)

    }, [fileSelections, fileContext])



    function toggleFileFromSelection(fileIndex : number) {
        const _temp = fileSelections
        _temp[fileIndex].isSelected = !_temp[fileIndex].isSelected
        setFileSelections([..._temp])
    }





    const handleUploadClick = () => {
        if(hiddenFileInput.current){
            hiddenFileInput.current.click()
        }
    }

    function handleAddFiltersClick() {
        const files = fileSelections.map((fileSelection) => {return fileSelection.file})
        fileContext.setUploadedFiles(files)
        
        navigate("/filter")
    }

    function handleClickSelect(fileIndex : number) {
        if(fileSelections[fileIndex].isSelected) {
            toggleFileFromSelection(fileIndex)
        }
        else {
            clearSelection()
            toggleFileFromSelection(fileIndex)
        }
    }

    function handleCtrlKeySelect(fileIndex : number) {
        toggleFileFromSelection(fileIndex)
    }

    function handleShiftClickSelect(fileIndex : number) {
        if(fileSelections[previouslySelectedIndex].isSelected) {
            if(fileIndex < previouslySelectedIndex) {
                for(let i = fileIndex; i <= previouslySelectedIndex; i++) {
                    fileSelections[i].isSelected = true
                }
            }
            else {
                for(let i = fileIndex; i >= previouslySelectedIndex; i--) {
                    fileSelections[i].isSelected = true
                }
            }
        }
        else {
            for(let i = 0; i <= fileIndex; i++) {
                fileSelections[i].isSelected = true
            }
        }

        setFileSelections([...fileSelections])
    }



    const handleKeyDown = useCallback((event : KeyboardEvent) => {
        
        if(event.key === "Delete") {
            removeCurrentSelectionFromUpload();
        }
        else if(event.key === "Escape") {
            clearSelection()
        }
        else if(event.ctrlKey) {
            if(event.key === "a") {
                selectAll()
            }
        }

    }, [removeCurrentSelectionFromUpload, clearSelection, selectAll])

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown)

        return () => {
            window.removeEventListener("keydown", handleKeyDown)
        }

    }, [handleKeyDown])



    function handleFileUpload(event : React.ChangeEvent<HTMLInputElement>) {

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
        
    }





    const FileCard = (props: {fileIndex: number}) => {
        return (
            <div className="border-black dark:text-black
                            dark:border-white dark:text-white
                            flex flex-row border-[0.1rem] px-[2rem]">
                <div className={fileSelections[props.fileIndex].isSelected ?
                    `text-red border-red
                    dark:text-red
                    flex-grow select-none cursor-pointer`
                :
                    `text-black border-black
                    dark:text-white
                    flex-grow select-none cursor-pointer`}
                onClick={(e) => {
                    setCurrentlySelectedIndex(props.fileIndex)

                    if (e.shiftKey) {
                        handleShiftClickSelect(props.fileIndex);
                    }
                    else if (e.ctrlKey) {
                        handleCtrlKeySelect(props.fileIndex);
                    }
                    else {
                        handleClickSelect(props.fileIndex);
                    }

                    setPreviouslySelectedIndex(props.fileIndex);
                } }>
                {fileSelections[props.fileIndex].fileName}
                </div>
                <div className="cursor-pointer select-none" onClick={() => { setShowModal(!showModal); setCurrentlySelectedIndex(props.fileIndex)} }>
                    Open File
                </div>
            </div>
        )
        
    }



    return (
        <div className="dark:bg-blue bg-white justify-center
                        flex flex-col flex-grow">
            <Modal modalTrigger={showModal} onClose={()=>{setShowModal(false)}}>
                <ViewFilePopup onXClicked={()=>{setShowModal(false)}} uploadedFiles={fileContext.uploadedFiles} currentlySelectedIndex={currentlySelectedIndex}></ViewFilePopup>
            </Modal>
            <div className="flex justify-center">
                <Button className=" dark:border-white dark:text-white
                                    border-black text-black
                                    border-[0.1rem] flex justify-between gap-[0.5rem] p-[0.7rem] mt-[1.5rem]"
                    onClick={handleUploadClick} >
                    <IonIcon className = "pt-[0.3rem]" icon = {cloudUploadOutline}></IonIcon>
                    Upload Files
                    <input accept=".doc,.docx,.pdf,.png,.jpg" hidden ref={hiddenFileInput} type="file" multiple onChange={(event) => {handleFileUpload(event)}}/>
                </Button>
            </div>
            <div className="flex flex-grow flex-col min-h-[20rem] h-[0] mt-[1.5rem] overflow-auto">
                <ol className=" border-black self-center flex-grow
                                dark:border-white
                                border-[0.1rem] overflow-y-auto min-w-[35rem] w-[60vw]">
                    {fileSelections.map((_selectableFile : FileSelection, index : number) => <li key={index}><FileCard fileIndex={index}></FileCard></li>)}
                </ol>
                <div className="h-[5rem]
                                text-black
                                dark: text-white
                                self-center">
                    {
                    fileSelections.some((fileSelection) => fileSelection.isSelected) ?
                        <div className="flex flex-col my-[1rem]">
                            <Button className="text-black
                                            dark: text-white
                                            flex-grow self-center"
                                onClick={() => { removeCurrentSelectionFromUpload(); } }>
                                            Remove Selected Files
                            </Button>
                            <Button className="text-black
                                            dark: text-white
                                            flex-grow self-center"
                                onClick={() => { clearSelection(); } }>
                                            Clear Selection
                            </Button>
                        </div>
                    :
                        <Button onClick={() => selectAll()} className="my-[1.5rem]">
                            { fileSelections.length > 0 ? "Select All" : ""}
                        </Button>
                    }
                </div>
                
                
            </div>
            <div className="flex justify-center">
                <Button className=" dark:border-white dark:text-white
                                    border-black text-black
                                    flex justify-center p-[1rem] mb-[4rem] border-[0.1rem]"
                        onClick={()=>handleAddFiltersClick()}>
                    Add Filters to Uploaded Files
                </Button>
            </div>
        </div>
    )
}

export default ResumeUploadScreen