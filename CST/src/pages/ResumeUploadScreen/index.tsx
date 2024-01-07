import { IonIcon } from "@ionic/react"
import { cloudUploadOutline } from 'ionicons/icons';
import { useContext, useEffect, useState } from "react";
import { FileContext } from "../../context/FileContext";
import { useNavigate } from "react-router-dom";
import { FilePond, registerPlugin } from 'react-filepond'

const ResumeUploadScreen = () => {

    const navigate = useNavigate()
    

    
    const fileContext = useContext(FileContext)
    const uploadedFiles = fileContext.uploadedFiles

    const setUploadedFiles = fileContext.setUploadedFiles
    const setChosenFiles = fileContext.setUploadedFiles





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



    const [fileSelections, setFileSelections] = useState([] as FileSelection[])
    const [previouslySelectedIndex, setPreviouslySelectedIndex] = useState(0)

    // Runs once after page render
    function initFileSelections() {
        setFileSelections(uploadedFiles.map((file) => {return new FileSelection(file)}))
    }



    useEffect(() => {
        return ()  => {
            initFileSelections()
        }
    }, [])





    function handleKeyDown(event : KeyboardEvent) {
        if(event.key === "Delete") {
            removeCurrentSelectionFromUpload();
        }
        else if(event.ctrlKey) {
            if(event.key === "a") {
                selectAll()
            }
        }
    }

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown)

        return () => {
            window.removeEventListener("keydown", handleKeyDown)
        }
    }, [])





    function handleUploadClick() {
        setUploadedFiles([...uploadedFiles])
    }

    function handleAddFiltersClick() {
        const uploadedFiles = fileSelections.map((fileSelection) => {return fileSelection.file})
        setUploadedFiles(uploadedFiles)
        setChosenFiles(uploadedFiles)

        clearSelection()
        
        navigate("/filter")
    }


    


    function toggleFileFromSelection(fileIndex : number) {
        fileSelections[fileIndex].isSelected = !fileSelections[fileIndex].isSelected
    }

    function clearSelection() {
        setFileSelections(fileSelections.map((fileSelection) => {
            
            fileSelection.isSelected = false;

            return fileSelection

        }))
    }

    function selectAll() {
        setFileSelections(fileSelections.map((fileSelection) => {
            
            fileSelection.isSelected = true;

            return fileSelection

        }))
    }



    function removeCurrentSelectionFromUpload() {
        setUploadedFiles(fileSelections.filter((fileSelection) => { return fileSelection.isSelected }).map((fileSelection) => fileSelection.file))

        initFileSelections()
    }



    function handleClickSelect(fileIndex : number) {
        clearSelection();

        toggleFileFromSelection(fileIndex)
    }

    function handleCtrlKeySelect(fileIndex : number) {
        toggleFileFromSelection(fileIndex)
    }

    function handleShiftClickSelect(fileIndex : number) {
        if(fileSelections[previouslySelectedIndex].isSelected) {
            if(fileIndex < previouslySelectedIndex) {
                for(let i = fileIndex; i < previouslySelectedIndex; i++) {
                    fileSelections[fileIndex].isSelected = true
                }
            }
            else {
                for(let i = fileIndex; i > previouslySelectedIndex; i--) {
                    fileSelections[fileIndex].isSelected = true
                }
            }
        }
        else {
            handleClickSelect(fileIndex)
        }
    }





    const FileCard = (props: {fileIndex: number}) => {
        return (
            <div className={
                        fileSelections[props.fileIndex].isSelected ?
                            `text-red border-red
                            dark:text-red dark:border-red
                            text-center border-[0.1rem] flex-grow cursor-pointer select-none`
                        :   
                            `text-black border-black
                            dark:text-white dark:border-white
                            text-center border-[0.1rem] flex-grow cursor-pointer select-none`
                    }
                    onClick={(e) => {
                        if(e.shiftKey) {
                            handleShiftClickSelect(props.fileIndex)
                        }
                        else if (e.ctrlKey) {
                            handleCtrlKeySelect(props.fileIndex)
                        }
                        else {
                            handleClickSelect(props.fileIndex)
                        }

                        setPreviouslySelectedIndex(props.fileIndex)
                    }}>
                    <div className="flex flex-row justify-between px-[2rem] overflow-x-hidden">
                        {fileSelections[props.fileIndex].fileName}
                    </div>
            </div>
        )
        
    }



    return (
        <div className="dark:bg-blue bg-white justify-center
                        w-screen flex flex-col">
            <div className="flex justify-center">
                <button className="dark:border-white dark:text-white
                                    border-black text-black
                                    border-[0.1rem] flex justify-between gap-[0.5rem] p-[0.7rem] mt-[1.5rem]"
                    onClick={handleUploadClick} >
                    <IonIcon className = "pt-[0.3rem]" icon = {cloudUploadOutline}></IonIcon>
                    Upload New Files
                </button>
            </div>
            <div className="flex flex-grow flex-col mt-[1.5rem]">
                <ol className="border-black self-center flex-grow
                                dark:border-white
                                border-[0.1rem] w-[35rem] max-h-[50vh] min-h-[8rem] overflow-y-scroll">
                    {fileSelections.map((_selectableFile : FileSelection, index : number) => <li key={index}><FileCard fileIndex={index}></FileCard></li>)}
                </ol>
                {
                fileSelections.length > 0 ?
                    <>
                        <div className="pt-[1rem] self-center cursor-pointer select-none" onClick={() => { removeCurrentSelectionFromUpload(); } }>
                                Remove Selected Files
                        </div>
                        <div className="pt-[0.2rem] self-center cursor-pointer select-none" onClick={() => { clearSelection() } }>
                                    Clear Selection
                        </div>
                    </>
                :
                    <div className="p-[2.1rem]" />
                }
                
            </div>
            <div className="flex justify-center">
                <button className="dark:border-white dark:text-white
                                    border-black text-black
                                    flex justify-center p-[1rem] mb-[4rem] mt-[1.5rem] border-[0.1rem]"
                        onClick={handleAddFiltersClick}>
                    Add Filters to Uploaded Files
                </button>
            </div>
        </div>
        
        
        
    )
}
export default ResumeUploadScreen