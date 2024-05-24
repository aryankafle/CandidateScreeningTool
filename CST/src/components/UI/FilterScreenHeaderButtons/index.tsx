import { IonIcon } from "@ionic/react"
import { colorWandOutline } from "ionicons/icons"
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom"
import { createResumeResult } from "../../../requests/ResumeRequests"
import { useContext, useEffect } from "react"
import UserContext from "../../../context/UserContext"
import SelectionContext from '../../../context/SelectionContext';
import BatchContext from '../../../context/BatchContext';
import FlagContext from "../../../context/FlagContext"
import { Result } from "../../../utils/Result"





const HeaderButtons = () => {

    const navigate = useNavigate()
    
    const { selectedFilters, uploadedFiles } = useContext(SelectionContext)
    const { fileIDs, setBatchResults } = useContext(BatchContext)
    const { setLoadingState, flags } = useContext(FlagContext)

    const { userData } = useContext(UserContext)





    useEffect(() => {

        if(uploadedFiles.length < 2) {

            navigate("/home/resume-upload")

        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])





    const handleFilterResumes = async () => {

        const scoredResumePromises = fileIDs.map( id => createResumeResult( selectedFilters, id, userData.id ) )

        const scoredResumeSettleResults = await Promise.allSettled( scoredResumePromises )

        const results = []

        for(const settleResult of scoredResumeSettleResults) {

            if(settleResult.status === "fulfilled") {

                const result : Result = settleResult.value
                
                results.push(result)
                setBatchResults( results )

                continue;

            }

            // Do thing with error files here

        }



        
    }

    
    
    const handleNext = async () => {

        setLoadingState(true)

        if(!flags.active.includes('filters have changed')) {

            navigate("/results")
            return;

        }

        await handleFilterResumes()
        
        navigate("/results")


    }





    return (
        <div className="overflow-auto p-[0.3rem] flex flex-row justify-between dark:bg-black">
            
        </div>
    )
}

export default HeaderButtons