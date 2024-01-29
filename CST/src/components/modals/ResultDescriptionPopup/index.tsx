import { IonIcon } from "@ionic/react"
import { closeCircleOutline } from 'ionicons/icons';
import { forEach } from "lodash";


type ResultDescriptionPopupProps = {
    selectedDescription : string
    selectedFilters : string[]
    onXClicked : () => void
}



const ResultsDescriptionPopup : React.FC<ResultDescriptionPopupProps> = ({selectedDescription, selectedFilters, onXClicked}) => {
    for (let i = 0; i < selectedFilters.length; i++){
        
    }

    return(
        <div className="flex w-screen items-center justify-center">
            <div className="flex justify-center bg-white w-3/4 rounded-lg text-2xl">
                <div className="text-right">
                    <IonIcon className="cursor-pointer text-[2rem] text-left hover:text-red" icon={closeCircleOutline}                     
                    onClick={onXClicked}/>
                </div>
                <div className="flex w-screen">
                    {selectedDescription}
                </div>
                <div className="">
                    {}
                </div>
            </div>
        </div>  
    )
}

export default ResultsDescriptionPopup;