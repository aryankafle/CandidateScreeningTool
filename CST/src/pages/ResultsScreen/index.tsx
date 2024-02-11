import React, { useContext, useEffect, useMemo, useState } from "react";
import Modal from '../../components/modals/Modal';
import ResultsDescriptionPopup from "../../components/modals/ResultDescriptionPopup";
import { bookmarkOutline } from 'ionicons/icons';
import { IonIcon } from "@ionic/react";
import { SavedList, SavedListsContext } from '../../context/SavedListsContext';
import { Result, Applicant, Grades } from "../../utils/Result";


const ResultsScreen = () => {
    const [showModal, setShowModal] = useState(false);
    const [showSidePanel, setShowSidePanel] = useState(false);

    const savedListContext = useContext(SavedListsContext)
    const currentSavedList = savedListContext.currentSavedList

    const candidates = useMemo(() => currentSavedList?.orderedResumeList, [currentSavedList?.orderedResumeList])
    const [currentCandidate, setCurrentCandidate] = useState<Result>(new Result({name: "loading..."}, {} as File, 0, "loading..."))

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





    const getRatingImage = (grade : Grades) => {
        switch(grade) {
            case Grades.A:
                return <img alt="'A' Rating" src="assets/a-rating.png"
                            className="self-center w-[4rem] h-[4rem]"
                />;
            case Grades.B:
                return <img alt="'B' Rating" src="assets/b-rating.png"
                            className="self-center w-[4rem] h-[4rem]"
                />;
            case Grades.C:
                return <img alt="'C' Rating" src="assets/c-rating.png"
                            className="self-center w-[4rem] h-[4rem]"
                />;
            case Grades.D:
                return <img alt="'D' Rating" src="assets/d-rating.png"
                            className="self-center w-[4rem] h-[4rem]"
                />;
            case Grades.F:
                return <img alt="'F' Rating" src="assets/f-rating.png"
                            className="self-center w-[4rem] h-[4rem]"
                />;
            default:
                throw new Error(`Grade: ${grade} is out of range!`)
        }
    }

    const IndividualCandidateCard = (props: {candidate : Result}) => {

        return (
            <div 
                className=" bg-green dark:bg-white
                            flex flex-row flex-grow w-[70%] rounded-r-full py-[1rem]"
                onClick={() => {
                    setShowModal(true)
                    setCurrentCandidate(props.candidate)
                }}
            >
                <div className="flex flex-grow self-center justify-center">
                    {props.candidate.applicant.name}
                </div>
                <div className="pr-[2rem]">
                    { getRatingImage(props.candidate.grade ) }
                </div>
            </div>
        )
    }



    return (
        <div className="dark:bg-blue bg-white
                        text-2xl flex flex-row 
                        flex-grow overflow-scroll">
            <div className="flex flex-col flex-grow overflow-scroll" >
                { showModal && <Modal modalTrigger={showModal} onClose={()=>{setShowModal(false)}}>
                    <ResultsDescriptionPopup
                        selectedDescription={currentCandidate.summary as string}
                        selectedFilters={[]}
                        onXClicked={() => { setShowModal(false) }}
                    />
                </Modal>}
                <div className="flex my-10 max-w-screen-sm p-6 dark:bg-white bg-blue rounded-r-full">
                    <h1>Here are some great candidates based on your needs:</h1>
                </div>
                <div className="flex flex-col justify-center gap-[1.3rem]">
                    {candidates?.map((candidate) => <IndividualCandidateCard 
                        key={candidate.exactScore}
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