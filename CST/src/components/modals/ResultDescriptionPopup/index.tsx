import { IonIcon } from "@ionic/react"
import { closeCircleOutline } from 'ionicons/icons';
import { filter, forEach } from "lodash";


type ResultDescriptionPopupProps = {
    selectedDescription : string
    selectedFilters : string[]
    onXClicked : () => void
}



const ResultsDescriptionPopup : React.FC<ResultDescriptionPopupProps> = ({selectedDescription, selectedFilters, onXClicked}) => {
    var formattedFilters = selectedFilters.map((filter, index) => <p className="flex m-1 border-double">{selectedFilters.at(index)}</p>);

    return(
        <div className="flex w-screen items-center justify-center">
            <div className="justify-center bg-white w-3/4 rounded-lg text-2xl m-px">
                <div className="text-right">
                    <IonIcon className="cursor-pointer text-[2rem] text-left hover:text-red" icon={closeCircleOutline}                     
                    onClick={onXClicked}/>
                </div>
                <div className="flex ">
                    {formattedFilters}
                </div>
                <div className="">
                    Description: {selectedDescription}
                </div>
            </div>
        </div>  
    )
}

export default ResultsDescriptionPopup;