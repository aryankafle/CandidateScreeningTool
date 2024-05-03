import BackButton from "../../buttons/BackButton"
import { IonIcon } from "@ionic/react"
import { colorWandOutline } from "ionicons/icons"
import Button from "../../buttons/ImprovedButtonComponent"
import { useNavigate } from "react-router-dom"
import { createResumeResult } from "../../../requests/ResumeRequests"
import { useContext, useEffect } from "react"
import { UserContext } from "../../../context/UserContext"
import { SelectionContext } from '../../../context/SelectionContext';
import { FlagContext } from "../../../context/FlagContext"
import { SavedList } from "../../../utils/SavedList"





const HeaderButtons = () => {

    const navigate = useNavigate()
    
    const selectionContext = useContext(SelectionContext)
    const { setLoadingState, flags } = useContext(FlagContext)

    const { userData } = useContext(UserContext)





    useEffect(() => {

        if(!selectionContext.currentBatchId || selectionContext.uploadedFiles.length < 2 || !selectionContext.currentBatchName) {

            navigate("/home/resume-upload")

        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])





    const handleFilterResumes = async () => {

        const settleResults = await Promise.allSettled(
            selectionContext.currentBatchFileIds
            .map( id => createResumeResult(selectionContext.selectedFilters, id, userData.id )
        ))
        
    }

    
    
    const handleNext = () => {

        setLoadingState(true)

        if(!flags.active.includes('filters have changed')) {

            navigate("/results")
            return;

        }

        handleFilterResumes()
        .then( () => navigate("/results") )


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
                    onClick={ handleNext }
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