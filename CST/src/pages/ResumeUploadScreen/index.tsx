import { IonIcon } from "@ionic/react"
import { cloudUploadOutline } from 'ionicons/icons';
import { Key, useContext, useEffect, useState } from "react";
import { FileContext } from "../../context/FileContext";
import { useNavigate } from "react-router-dom";

const ResumeUploadScreen = () => {

    const navigate = useNavigate()
    

    
    const fileContext = useContext(FileContext)
    const uploadedFiles = fileContext.uploadedFiles
    const setUploadedFiles = fileContext.setUploadedFiles
    const setChosenFiles = fileContext.setUploadedFiles

    const [selectedFiles, setSelectedFiles] = useState([] as string[])
    const [previouslySelected, setPreviouslySelected] = useState("")





    useEffect(() => {
        const keyDownHandler = (e : KeyboardEvent) => {
            if(e.key === 'Delete') {
                e.preventDefault()

                if(selectedFiles.length > 0)  {
                    handleRemoveSelectionFromUpload()
                }
            }
        }

        document.addEventListener('keydown', keyDownHandler);

        return () => {
            document.removeEventListener('keydown', keyDownHandler)
        }
    }, [])



    


    function handleUploadClick() {
        const file = "new file " + Math.floor(Math.random() * 100)
        alert("uploading new files")

        const uniqueFiles = [...new Set([...uploadedFiles, file])]
        setUploadedFiles(uniqueFiles)
    }

    function handleAddFiltersClick() {
        setChosenFiles(uploadedFiles)
        setUploadedFiles([])
        setSelectedFiles([])
        navigate("/filter")
    }




    function handleRemoveSelectionFromUpload() {
        
        const temp = uploadedFiles.filter((val) => !selectedFiles.includes(val))

        setUploadedFiles(temp)
        setSelectedFiles([])
    }


    
    function handleRemoveFileFromSelect(file : string) {
        const temp = selectedFiles.filter((val) => file !== val)
        setSelectedFiles(temp)
    }

    function handleAddFileToSelect(file : string) {
        setSelectedFiles([file])
        setPreviouslySelected(file)
    }

    function handleCtrlKeySelect(file : string) {
        setSelectedFiles([...selectedFiles, file])
        setPreviouslySelected(file)
    }

    function handleShiftClickSelect(file : string) {
        if(selectedFiles.length < 1) {
            handleAddFileToSelect(file);
        }
        else if(file === previouslySelected) {
            handleRemoveFileFromSelect(file)
        }
        else {
            const uploadIndex = uploadedFiles.indexOf(file)
            const previousUploadIndex = uploadedFiles.indexOf(previouslySelected)
            
            var temp;

            if(uploadIndex < previousUploadIndex) {
                temp = uploadedFiles.slice(uploadIndex, previousUploadIndex < uploadedFiles.length ? previousUploadIndex+1 : undefined)
                
            } else {
                temp = uploadedFiles.slice(previousUploadIndex, uploadIndex < uploadedFiles.length ? uploadIndex+1 : undefined)
            }

            const combined = [...selectedFiles, ...temp]
            const uniqueCombined = [...new Set(combined)]
            setSelectedFiles(uniqueCombined)
        }

        setPreviouslySelected(file)
    }




    const FileCard =  (props: {file: string}) => {
        return (
            <div className="flex flex-row justify-between px-[2rem] overflow-x-hidden">
                {props.file}
            </div>
        )
    }

    const ListCard = (props: {file: string}) => {
        return (
            selectedFiles.includes(props.file) ? 
                <div className="text-red border-red
                                dark:text-red dark:border-red
                                text-center border-[0.1rem] flex-grow cursor-pointer select-none"
                        onClick={(e) => {
                            handleRemoveFileFromSelect(props.file)
                        }}>
                    <FileCard file={props.file}/>
                </div>

            :
                <div className="text-black border-black
                                    dark:text-white dark:border-white
                                    text-center border-[0.1rem] flex-grow cursor-pointer select-none"
                        onClick={(e) => {
                            if(e.shiftKey && !e.ctrlKey) {
                                handleShiftClickSelect(props.file)
                            } else if (e.ctrlKey && !e.shiftKey) {
                                handleCtrlKeySelect(props.file)
                            } else {
                                handleAddFileToSelect(props.file)
                            }
                        }}>
                        <FileCard file={props.file}/>
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
                    <div>
                        Upload New Files
                    </div>
                </button>
            </div>
            <div className="flex flex-grow flex-col mt-[1.5rem]">
                <ol className="border-black self-center flex-grow
                                dark:border-white
                                border-[0.1rem] w-[35rem] max-h-[50vh] min-h-[8rem] overflow-y-scroll">
                    {uploadedFiles.map((file : string, index : number) => <li key={index}><ListCard file={file}></ListCard></li>)}
                </ol>
                {
                selectedFiles.length > 0 ?
                    <>
                    <div className="pt-[1rem] self-center cursor-pointer select-none" onClick={() => { handleRemoveSelectionFromUpload(); } }>
                            Remove Selected Files
                    </div>
                    <div className="pt-[0.2rem] self-center cursor-pointer select-none" onClick={() => { setSelectedFiles([]) } }>
                                Clear Selection
                    </div>
                    </>
                :
                    <></>
                }
                
            </div>
        </div>
        
        
        
    )
}
export default ResumeUploadScreen