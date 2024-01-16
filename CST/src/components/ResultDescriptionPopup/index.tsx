type ResultDescriptionPopupProps = {
    selectedResultName : string
}

const ResultsDescriptionPopup : React.FC<ResultDescriptionPopupProps> = ({selectedResultName}) => {
    return(
        <div className="flex w-screen items-center justify-center">
            <div className="flex justify-center bg-white w-3/4 rounded-lg text-2xl">
                {selectedResultName}
            </div>
        </div>
        
    )
}

export default ResultsDescriptionPopup;