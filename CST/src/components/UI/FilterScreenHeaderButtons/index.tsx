import BackButton from "../../buttons/BackButton"
import { IonIcon } from "@ionic/react"
import { colorWandOutline } from "ionicons/icons"
import Button from "../../buttons/ImprovedButtonComponent"
import { useNavigate } from "react-router-dom"
import { getListResults, filterExistingResumeList, uploadFiltersToDatabase } from "../../../requests/ResumeRequests"
import { FileContext } from '../../../context/FileContext';
import { useContext } from "react"
import { FilterContext } from "../../../context/FilterContext"
import { SavedList, SavedListsContext } from '../../../context/SavedListsContext';
import { UserContext } from "../../../context/UserContext"
import { useState } from "react"
import Modal from "../../modals/Modal"
import LoadingSpinner from "../LoadingSpinner"





const HeaderButtons = () => {

    const navigate = useNavigate()
    
    const fileContext = useContext(FileContext)
    const filterContext = useContext(FilterContext)
    const savedListsContext = useContext(SavedListsContext)
    const [showLoadingScreen, setShowLoadingScreen] = useState(false)


    const { userData } = useContext(UserContext)



    return (
        <div className="overflow-auto p-[0.3rem] flex flex-row justify-between">
            <div className="flex flex-col justify-center">
                <BackButton toRoute="/home"></BackButton>
            </div>
            {
                showLoadingScreen && <Modal
                    modalTrigger={showLoadingScreen}
                    onClose={()=>{setShowLoadingScreen(false)}}
                >
                    {
                        <div className="flex flex-col self-center text-center justify-center
                        bg-grayLight border-4 border-gray rounded
                        text-grayDark w-[80%] h-[80%] text-3xl">
                            <LoadingSpinner></LoadingSpinner>
                        </div>
                    }

                </Modal>
            }
            <div className="flex flex-col justify-center">
                <Button
                        className=" rounded-md justify-center gap-[0.5rem] border-[0.1rem] flex p-[0.5rem] dark:border-white dark:text-white dark:bg-black dark:hover:bg-gray dark:active:bg-blue
                                    border-black text-black bg-white hover:bg-gray active:bg-blue"
                        onClick={async () => {

                            let uploadError = false;
                            let fetchError = false;

                            let id = userData.id

                            setShowLoadingScreen(true)

                            await uploadFiltersToDatabase(filterContext.selectedFilters.map((filter) => filter.toJson()), fileContext.currentBatchId, userData.id)

                            .then(
                                async () => {

                                    await filterExistingResumeList(fileContext.currentBatchId, id)
                                    
                                    let listResults
                                    
                                    try {
                                        listResults = await getListResults(fileContext.currentBatchId, id)
                                    }
                                    catch (error) {
                                        console.log("Error getting filter results: ", error)
                                    }

                                    if(listResults) {
                                        savedListsContext.setCurrentSavedList(
                                            new SavedList(fileContext.currentBatchName, "", listResults)
                                        )

                                        navigate("/results")
                                    }

                                    
                                }
                            )
                            .catch((error) => {
                                console.log("Error uploading filters: ", error)
                                uploadError = true;
                            })

                            if(uploadError) {
                                alert("error uploading filters")
                                return;
                            }
                            if(fetchError) {
                                alert("error fetching results")
                                return;
                            }

                            setShowLoadingScreen(false)

                        }}
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