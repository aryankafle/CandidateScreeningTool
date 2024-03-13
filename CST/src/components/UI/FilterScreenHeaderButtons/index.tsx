import BackButton from "../../buttons/BackButton"
import { IonIcon } from "@ionic/react"
import { colorWandOutline, flag } from "ionicons/icons"
import Button from "../../buttons/ImprovedButtonComponent"
import { useNavigate } from "react-router-dom"
import { getListResults, filterExistingResumeList, uploadFiltersToDatabase } from "../../../requests/ResumeRequests"
import { FileContext } from '../../../context/FileContext';
import { useContext } from "react"
import { FilterContext } from "../../../context/FilterContext"
import { UserContext } from "../../../context/UserContext"
import { SelectionContext } from '../../../context/SelectionContext';
import { FlagContext } from "../../../context/FlagContext"
import { SavedList } from "../../../utils/SavedList"





const HeaderButtons = () => {

    const navigate = useNavigate()
    
    const fileContext = useContext(FileContext)
    const filterContext = useContext(FilterContext)
    const selectionContext = useContext(SelectionContext)
    const { filtersChanged } = useContext(FlagContext)
    const { filtersApplied, setFiltersApplied } = useContext(FlagContext)

    const { userData } = useContext(UserContext)





    const handleFilterResumes = async () => {

        if (!filtersChanged) {
                            
            navigate("/results")

            return;

        }


        
        let uploadError;
        let filterError;
        let fetchError;        


        setFiltersApplied(true)


        await uploadFiltersToDatabase(filterContext.selectedFilters, fileContext.currentBatchId, userData.id)

        await filterExistingResumeList(fileContext.currentBatchId, userData.id)

        const listResults = await getListResults(fileContext.currentBatchId, userData.id)

        console.log(fetchError)

        if(!listResults) throw Error("List results are undefined.");



        const newSavedList = new SavedList(fileContext.currentBatchName, "", listResults, undefined, userData.id )



        selectionContext.setCurrentSavedList(newSavedList)

        selectionContext.setPreviouslySavedList(newSavedList)

        selectionContext.setPreviouslySelectedFilters([...filterContext.selectedFilters])



        if(uploadError) {
            alert("error uploading filters")
            return;
        }
        if(filterError) {
            alert("error filtering")
            return;
        }
        if(fetchError) {
            alert("error fetching results")
            return;
        }



        navigate("/results")

    }
    




    return (
        <div className="overflow-auto p-[0.3rem] flex flex-row justify-between dark:bg-black">
            <div className="flex flex-col justify-center">
                <BackButton toRoute="/home"></BackButton>
            </div>
            <div className="flex flex-col justify-center">
                <Button
                    className=" rounded-md justify-center gap-[0.5rem] border-[0.1rem] flex p-[0.5rem] dark:border-white dark:text-white dark:bg-black dark:hover:bg-gray dark:active:bg-blue
                                border-black text-black bg-white hover:bg-gray active:bg-blue"
                    onClick={ handleFilterResumes }
                >
                    <IonIcon
                        icon={colorWandOutline}
                        size="small"
                        className="self-center"
                    />
                    <span>Apply Filters</span>
                </Button>
            </div>
        </div>
    )
}

export default HeaderButtons