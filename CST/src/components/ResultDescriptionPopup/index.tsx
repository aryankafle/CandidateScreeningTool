
type ResultDescriptionPopupProps = {
    selectedResultName : string
    onXClicked : () => void
}



const ResultsDescriptionPopup : React.FC<ResultDescriptionPopupProps> = ({selectedResultName, onXClicked}) => {
    return(
        <div className="flex w-screen items-center justify-center">
            <div className="flex justify-center bg-white w-3/4 rounded-lg text-2xl">
                {selectedResultName}
                <button className='' onClick={onXClicked}>CLOSE</button>
            </div>
        </div>  
    )
}

export default ResultsDescriptionPopup;