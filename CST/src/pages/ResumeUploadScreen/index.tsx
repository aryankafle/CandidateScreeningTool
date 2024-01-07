import { IonIcon } from "@ionic/react"
import { cloudUploadOutline } from 'ionicons/icons';
import { useContext, useEffect, useRef, useState } from "react";
import { FileContext } from "../../context/FileContext";
import { useNavigate } from "react-router-dom";
import Button from '../../components/ImprovedButtonComponent'
import DocumentView from '../../components/DocumentView';
import Modal from '../../components/Modal';

const ResumeUploadScreen = () => {

    const navigate = useNavigate()





    const hiddenFileInput = useRef<HTMLInputElement>(null)
    
    const fileContext = useContext(FileContext)
    const [uploadedFiles, setUploadedFiles] = useState(fileContext.uploadedFiles)



    const [showModal, setShowModal] = useState(false)





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
    const [currentlySelectedIndex, setCurrentlySelectedIndex] = useState(0)

    // Runs once after page render
    function initFileSelections() {
        const _init = uploadedFiles.map((file) => {return new FileSelection(file)})
        setFileSelections([..._init])
    }

    /*
        error disabled because this callback is supposed to be static
    */
    useEffect(() => {
        initFileSelections()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [uploadedFiles])





    function handleKeyDown(event : KeyboardEvent) {
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
    }

    /*
        error disabled because this callback is supposed to be static
    */
    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown)

        return () => {
            window.removeEventListener("keydown", handleKeyDown)
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fileSelections])





    function toggleFileFromSelection(fileIndex : number) {
        const _temp = fileSelections
        _temp[fileIndex].isSelected = !_temp[fileIndex].isSelected
        setFileSelections([..._temp])
    }

    function clearSelection() {
        const _noneSelected = [...fileSelections]

        for(let i = 0; i < _noneSelected.length; i++) {
            _noneSelected[i].isSelected = false
        }

        setFileSelections([..._noneSelected])
    }

    function selectAll() {
        const _allSelected = [...fileSelections]

        for(let i = 0; i < _allSelected.length; i++) {
            _allSelected[i].isSelected = true
        }

        setFileSelections([..._allSelected])
    }

    function removeCurrentSelectionFromUpload() {
        setUploadedFiles(fileSelections.filter((fileSelection) => { return !fileSelection.isSelected }).map((fileSelection) => fileSelection.file))
        setCurrentlySelectedIndex(0)
        setPreviouslySelectedIndex(0)
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



    function handleFileUpload(event : React.ChangeEvent<HTMLInputElement>) {
        if(!event.target.files) return;



        const tempFiles = [...uploadedFiles, ...event.target.files]
        const uniqueFiles = [...new Set(tempFiles)]

        setUploadedFiles(uniqueFiles)
    }



    const handleUploadClick = () => {
        if(hiddenFileInput.current){
            hiddenFileInput.current.click()
        }
    }

    function handleAddFiltersClick() {
        const uploadedFiles = fileSelections.map((fileSelection) => {return fileSelection.file})
        setUploadedFiles(uploadedFiles)
        
        navigate("/filter")
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
                <div className="cursor-pointer select-none" onClick={() => { setShowModal(true); setCurrentlySelectedIndex(props.fileIndex)} }>
                    Open File
                </div>
            </div>
        )
        
    }



    return (
        <div className="dark:bg-blue bg-white justify-center
                        flex w-screen flex-col">

            
            {showModal && <Modal className="bg-blue mx-[12.5vw] h-[75vh]" handleClose={() => {setShowModal(false)}}>

                    <DocumentView files={uploadedFiles} index={currentlySelectedIndex}/>
                </Modal>
            }
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
            <div className="flex flex-grow flex-col mt-[1.5rem] overflow-x-auto">
                <ol className=" border-black self-center flex-grow
                                dark:border-white
                                border-[0.1rem] max-h-[80vh] min-h-[8rem] overflow-y-scroll min-w-[35rem] w-[60vw]">
                    {fileSelections.map((_selectableFile : FileSelection, index : number) => <li key={index}><FileCard fileIndex={index}></FileCard></li>)}
                </ol>
                {
                fileSelections.some((fileSelection) => fileSelection.isSelected) ?
                    <>
                        <div className="text-black
                                        dark: text-white
                                        pt-[1rem] self-center"
                            onClick={() => { removeCurrentSelectionFromUpload(); } }>
                                        Remove Selected Files
                        </div>
                        <div className="text-black
                                        dark: text-white
                                        self-center"
                            onClick={() => { clearSelection(); } }>
                                        Clear Selection
                        </div>
                    </>
                :
                    <div className="p-[2rem]" />
                }
                
            </div>
            <div className="flex justify-center">
                <Button className=" dark:border-white dark:text-white
                                    border-black text-black
                                    flex justify-center p-[1rem] mb-[4rem] mt-[1.5rem] border-[0.1rem]"
                        onClick={handleAddFiltersClick}>
                    Add Filters to Uploaded Files
                </Button>
            </div>
        </div>
        
        
        
    )
}

export default ResumeUploadScreen