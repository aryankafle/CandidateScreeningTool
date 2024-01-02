import { IonIcon } from "@ionic/react"
import { cloudUpload } from 'ionicons/icons';
import { useContext } from "react";
import { FileContext } from "../../context";
import { useNavigate } from "react-router-dom";

const ResumeUploadScreen = () => {

    const navigate = useNavigate()
    
    const fileContext = useContext(FileContext)
    const uploadedFiles = fileContext.uploadedFiles
    const setUploadedFiles = fileContext.setUploadedFiles



    function handleUploadClick() {
        const file = "new file"
        
        alert("uploading new files")
        setUploadedFiles([...uploadedFiles, file])
    }

    function handleAddFiltersClick() {
        navigate("/filter")
    }





    const FileCard = (props: {file: string}) => {
        return (
            <div className="text-black
                            dark:text-white
                            text-center">
                {props.file}
            </div>
        )
    }

    return (
        <div className="dark:bg-blue bg-white
                        w-screen flex flex-col">
            <div className="flex justify-center">
                <button className="dark:border-white dark:text-white
                                    border-black text-black
                                    border-[0.1rem] flex justify-between gap-[0.5rem] p-[0.7rem] mt-[2rem]"
                    onClick={handleUploadClick} >
                    <IonIcon className = "pt-[0.3rem]" icon = {cloudUpload}></IonIcon>
                    <div>
                        Upload New Files
                    </div>
                </button>
            </div>
            <div className="flex justify-center mt-[4rem]">
                <ol className="border-black
                                dark:border-white
                                border-[0.1rem] w-[35rem] h-[40rem] overflow-y-scroll">
                    {uploadedFiles.map((file : string) => <FileCard file={file}></FileCard>)}
                </ol>
            </div>
            <div className="flex justify-center">
                <button className="dark:border-white dark:text-white
                                    border-black text-black
                                    flex justify-center p-[1rem] mt-[4rem] border-[0.1rem]"
                        onClick={handleAddFiltersClick}>
                    Add Filters to Uploaded Files
                </button>
            </div>
        </div>
        
        
        
    )
}
export default ResumeUploadScreen