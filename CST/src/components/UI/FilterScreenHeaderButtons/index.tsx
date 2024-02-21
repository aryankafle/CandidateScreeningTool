import BackButton from "../../buttons/BackButton"
import { IonIcon } from "@ionic/react"
import { colorWandOutline } from "ionicons/icons"
import Button from "../../buttons/ImprovedButtonComponent"
import { useNavigate } from "react-router-dom"
import { getListResults, getSortedResumes, uploadFiltersToDatabase } from "../../../requests/ResumeRequests"
import { FileContext } from '../../../context/FileContext';
import { useContext } from "react"
import { FilterContext } from "../../../context/FilterContext"
import { SavedList, SavedListsContext } from '../../../context/SavedListsContext';





const HeaderButtons = () => {

    const navigate = useNavigate()
    
    const fileContext = useContext(FileContext)
    const filterContext = useContext(FilterContext)
    const savedListsContext = useContext(SavedListsContext)

    return (
        <div className="overflow-auto p-[0.3rem] flex flex-row justify-between">
            <div className="flex flex-col justify-center">
                <BackButton toRoute="/home"></BackButton>
            </div>
            <div className="flex flex-col justify-center">
                <Button
                        className=" rounded-md justify-center gap-[0.5rem] border-[0.1rem] flex p-[0.5rem] dark:border-white dark:text-white dark:bg-black dark:hover:bg-gray dark:active:bg-blue
                                    border-black text-black bg-white hover:bg-gray active:bg-blue"
                        onClick={async () => {

                            let uploadError = false;
                            let fetchError = false;

                            uploadFiltersToDatabase(filterContext.selectedFilters, fileContext.currentBatchId, "nouser")
                            .then(
                                () => {
                                    // getListResults(fileContext.currentBatchId, "nouser")
                                    // .then((res) => {
                                    //     const resumes = res
                                    //     savedListsContext.setCurrentSavedList(
                                    //         new SavedList(fileContext.currentBatchName, "", resumes)
                                    //     )
                                    // })
                                    // .catch((error) => {
                                    //     console.log("Error fetching reuslts: ", error)
                                    //     fetchError = true;
                                    // })

                                    getSortedResumes(fileContext.uploadedFiles, filterContext.selectedFilters)
                                    .then((res) => {
                                        const resumes = res
                                        savedListsContext.setCurrentSavedList(
                                            new SavedList(fileContext.currentBatchName, "", resumes)
                                        )
                                    })
                                    .catch((error) => {
                                        console.log("Error fetching reuslts: ", error)
                                        fetchError = true;
                                    })
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

                            navigate("/results")
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