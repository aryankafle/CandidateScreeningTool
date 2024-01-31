import { IonIcon } from "@ionic/react"
import { closeCircleOutline } from 'ionicons/icons';
import { Filter } from "../../../context/FilterContext";
import { Result } from "../../../utils/Result";

type ResultDescriptionPopupProps = {
    selectedResult : Result
    onXClicked : () => void
}



const ResultsDescriptionPopup : React.FC<ResultDescriptionPopupProps> = ({selectedResult, onXClicked}) => {
    var filters = selectedResult.applicant
    //var formattedFilters = selectedFilters.map((filter, index) => <p className="flex m-1 border-double">{selectedFilters.at(index)}</p>);

    return(
        <div className="flex w-screen items-center justify-center">
            <div className="justify-center bg-white w-3/4 rounded-lg text-2xl m-px">
                <div className="text-right">
                    <IonIcon className="cursor-pointer text-[2rem] text-left hover:text-red" icon={closeCircleOutline}                     
                    onClick={onXClicked}/>
                </div>
                <div className="flex ">
                    {/* {formattedFilters} */}
                </div>
                <div className="">
                    Description: {selectedResult.description.toString()}
                </div>
            </div>
        </div>  
    )
}

export default ResultsDescriptionPopup;