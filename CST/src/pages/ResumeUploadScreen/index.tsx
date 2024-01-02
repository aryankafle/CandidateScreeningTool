import { IonIcon } from "@ionic/react"
import { cloudUpload } from 'ionicons/icons';

const ResumeUploadScreen = () => {

    function handleUploadClick() {
        alert("uploading new files")
    }

    return (
        <div className="dark:bg-blue bg-white
                        w-screen">
            <div className="flex justify-center">
                <button className="dark:border-white dark:text-white
                                border-black text-black
                                border-[1px] flex justify-between w-[10rem]"
                    onClick={handleUploadClick} >
                    <IonIcon className = "pt-[0.3rem]" icon = {cloudUpload}></IonIcon>
                    <div>
                        Upload New Files
                    </div>
                </button>
            </div>
        </div>
        
        
    )
}
export default ResumeUploadScreen