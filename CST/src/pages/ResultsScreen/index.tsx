import React, { useContext, useEffect, useMemo, useState } from "react";
import Modal from '../../components/modals/Modal';
import ResultsDescriptionPopup from "../../components/modals/ResultDescriptionPopup";
import { bookmarkOutline, save } from 'ionicons/icons';
import { IonIcon } from "@ionic/react";
import { SavedList, SavedListsContext } from '../../context/SavedListsContext';
import { Result, Applicant } from "../../utils/Result";


const ResultsScreen = () => {
    const [showModal, setShowModal] = useState(false);
    const [showSidePanel, setShowSidePanel] = useState(false);

    const savedListContext = useContext(SavedListsContext)
    const currentSavedList = savedListContext.currentSavedList

    const candidates = useMemo(() => currentSavedList?.orderedResumeList, [currentSavedList?.orderedResumeList])

    useEffect(() => {
        savedListContext.setCurrentSavedList(
            new SavedList(
                "dummy list",
                "list of dummy resumes",
                [
                    new Result(
                        {
                            name : "dude 1"
                        } as Applicant,
                        {} as File,
                        100,
                        "is the first dude"
                    ),
                    new Result(
                        {
                            name: "dude 2",
                            email: "dude2@gmail.com",
                            number: "dude2number"
                        } as Applicant,
                        {} as File,
                        400,
                        "is the second dude"
                    ),
                    new Result(
                        {
                            name: "dude 3",
                            email: "dude3@outlook.com",
                            number: "dude3num",
                            linkedIn: "dude3linkedin",
                            age: 2
                        } as Applicant,
                        {} as File,
                        200,
                        "is the third dude"
                    ),
                ], 
            )
        )
    }, [])



    const IndividualCandidateCard = (props: {candidate : Result}) => {

        return (
            <div className="flex">
                {props.candidate.exactScore}
            </div>
        )
    }



    return (
        <div className="dark:bg-blue bg-white
                        text-2xl flex flex-row 
                        flex-grow overflow-scroll">
            <div className="flex flex-col flex-grow overflow-scroll" >
                <Modal modalTrigger={showModal} onClose={()=>{setShowModal(false)}}>
                    
                </Modal>
                <div className="flex my-10 max-w-screen-sm p-6 dark:bg-white bg-blue rounded-r-full">
                    <h1>Here are some great candidates based on your needs:</h1>
                </div>
                <div className="flex flex-col justify-center">
                    {candidates?.map((candidate) => <IndividualCandidateCard 
                        candidate={candidate}
                    />)}
                </div>
            </div>  
            <div className={showSidePanel ? `flex flex-col w-2/5 h-screen bg-white justify-start` : `flex flex-col w-1/10 h-screen bg-white justify-start`}>
                {showSidePanel ?
                    <div className="w-full">
                        
                    </div>
                :
                    <div>
                        <IonIcon className="cursor-pointer text-[3rem] p-5" icon={bookmarkOutline} onClick={()=>setShowSidePanel(!showSidePanel)}></IonIcon>
                    </div>
                }
            </div>
        </div>
    );
}

export default ResultsScreen