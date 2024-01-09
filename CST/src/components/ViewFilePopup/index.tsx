import DocumentView from "../DocumentView";
import Button from "../ImprovedButtonComponent"
import { IonIcon } from "@ionic/react"
import { backspaceOutline } from 'ionicons/icons';

type ViewFilePopupProps = {
    uploadedFiles : File[]
    currentlySelectedIndex : number
    onXClicked : () => void
}

const ViewFilePopup : React.FC<ViewFilePopupProps> = ({ uploadedFiles, currentlySelectedIndex, onXClicked}) => {
    return (
        <div className="bg-white dark:bg-blue
                        flex flex-col flex-grow m-[10vw]">
            <Button className="flex self-end py-[0.3rem] px-[0.6rem] " onClick={onXClicked}>
                <IonIcon color="white" icon={backspaceOutline} size="large"></IonIcon>
            </Button>
            <div className="flex flex-col self-center flex-grow overflow-y-clip mb-[0.6rem] w-[79vw]">
                <DocumentView files={uploadedFiles} index={currentlySelectedIndex}/>
            </div>
        </div>
    )
}


export default ViewFilePopup