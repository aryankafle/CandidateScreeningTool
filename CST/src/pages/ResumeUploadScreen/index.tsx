import { IonIcon } from "@ionic/react"
import { cloudUpload } from 'ionicons/icons';
import { useContext, useState } from "react";
import { FileContext } from "../../context";
import { useNavigate } from "react-router-dom";
import { upload } from "@testing-library/user-event/dist/upload";

const ResumeUploadScreen = () => {

    const navigate = useNavigate()
    

    
    const fileContext = useContext(FileContext)
    const uploadedFiles = fileContext.uploadedFiles
    const setUploadedFiles = fileContext.setUploadedFiles

    const [selectedFiles, setSelectedFiles] = useState([] as string[])
    const [previouslySelected, setPreviouslySelected] = useState("")





    function handleUploadClick() {
        const file = "new file " + Math.floor(Math.random() * 100)
        alert("uploading new files")

        const uniqueFiles = [...new Set([...uploadedFiles, file])]
        setUploadedFiles(uniqueFiles)
    }

    function handleAddFiltersClick() {
        navigate("/filter")
    }
    
    function handleRemoveFileFromSelect(file : string) {
        const temp = selectedFiles.filter((val) => file != val)
        setSelectedFiles(temp)
    }

    function handleAddFileToSelect(file : string) {
        setSelectedFiles([file])
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

            if(uploadIndex < previousUploadIndex) {
                const temp = uploadedFiles.slice(uploadIndex, previousUploadIndex < uploadedFiles.length ? previousUploadIndex+1 : undefined)
                setSelectedFiles(temp)
            } else {
                const temp = uploadedFiles.slice(previousUploadIndex, uploadIndex < uploadedFiles.length ? uploadIndex+1 : undefined)
                setSelectedFiles(temp)
            }
        }
    }






    const FileCard = (props: {file: string}) => {
        return (
            selectedFiles.includes(props.file) ? 
                <div className="text-red
                                    dark:text-red
                                    text-center">
                        <button onClick={() => {handleRemoveFileFromSelect(props.file)}}>
                            <div>
                                {props.file}
                            </div>
                        </button>
                </div>
            :
                <div className="text-black
                                    dark:text-white
                                    text-center">
                        <button onClick={(e) => {
                                if(e.shiftKey) {
                                    handleShiftClickSelect(props.file)
                                } else {
                                    handleAddFileToSelect(props.file)
                                }
                            }}>
                            <div>
                                {props.file}
                            </div>
                        </button>
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
                    <IonIcon className = "pt-[0.3rem]" icon = {cloudUpload}></IonIcon>
                    <div>
                        Upload New Files
                    </div>
                </button>
            </div>
            <div className="flex flex-grow justify-center mt-[1.5rem]">
                <ol className="border-black
                                dark:border-white
                                border-[0.1rem] w-[35rem] max-h-[50vh] min-h-[8rem] overflow-y-scroll">
                    {uploadedFiles.map((file : string, index : number) => <li key={index}><FileCard file={file}></FileCard></li>)}
                </ol>
            </div>
            <div className="flex justify-center">
                <button className="dark:border-white dark:text-white
                                    border-black text-black
                                    flex justify-center p-[1rem] mb-[1.5rem] mt-[1.5rem] border-[0.1rem]"
                        onClick={handleAddFiltersClick}>
                    Add Filters to Uploaded Files
                </button>
            </div>
        </div>
        
        
        
    )
}
export default ResumeUploadScreen