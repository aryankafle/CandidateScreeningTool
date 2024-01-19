import { IonIcon } from "@ionic/react"
import { closeCircleOutline } from 'ionicons/icons';


type ResultDescriptionPopupProps = {
    selectedResultName : string
    onXClicked : () => void
}



const ResultsDescriptionPopup : React.FC<ResultDescriptionPopupProps> = ({selectedResultName, onXClicked}) => {
    return(
        <div className="flex w-screen items-center justify-center">
            <div className="flex justify-center bg-white w-3/4 rounded-lg text-2xl">
                {selectedResultName}
                <div className="text-right">
                    <IonIcon className="cursor-pointer text-[2rem] text-left hover:text-red" icon={closeCircleOutline}                     
                    onClick={onXClicked}/>
                </div>
                
            </div>
        </div>  
    )
}

export default ResultsDescriptionPopup;