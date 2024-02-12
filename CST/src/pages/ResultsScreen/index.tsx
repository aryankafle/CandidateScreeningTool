import React, { useContext, useEffect, useMemo, useState } from "react";
import Modal from '../../components/modals/Modal';
import ResultsDescriptionPopup from "../../components/modals/ResultDescriptionPopup";
import { caretBackOutline, caretForwardOutline, saveOutline} from 'ionicons/icons';
import { IonIcon } from "@ionic/react";
import { SavedList, SavedListsContext } from '../../context/SavedListsContext';
import { Result, Applicant, Grades } from "../../utils/Result";
import Button from "../../components/buttons/ImprovedButtonComponent";
import MultilineInput from "../../components/forms/MultilineInput"
import InputBox from "../../components/forms/InputBox";
import { useNavigate } from "react-router-dom";
import _ from "lodash"


const ResultsScreen = () => {
    const navigate = useNavigate()

    const [showModal, setShowModal] = useState(false);
    const [showSidePanel, setShowSidePanel] = useState(false);

    const savedListContext = useContext(SavedListsContext)

    const [currentCandidate, setCurrentCandidate] = useState<Result>(new Result({name: "loading..."}, {} as File, 0, "loading..."))

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [resumes, setResumes] = useState([] as Result[])

    useEffect(() => {
        setTitle(savedListContext.currentSavedList?.listName ? savedListContext.currentSavedList?.listName : "")
        setDescription(savedListContext.currentSavedList?.listDescription ? savedListContext.currentSavedList?.listDescription : "")
        setResumes(savedListContext.currentSavedList?.orderedResumeList ? savedListContext.currentSavedList?.orderedResumeList : [])
    }, [savedListContext.currentSavedList])

    useEffect(() => {
        if(!savedListContext.currentSavedList) {
            // throw new Error("No currently selected saved list.")
        }

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
                    )
                ], 
            )
        )
    }, [])

    const handleSaveList = () => {
        const shouldMakeNewList = 
            title !== savedListContext.currentSavedList?.listName ||
            description !== savedListContext.currentSavedList?.listDescription ||
            !_.isEqual(resumes, savedListContext.currentSavedList?.orderedResumeList)
        
        if(!shouldMakeNewList) {
            navigate("/home/saved-lists")
            return;
        }

        const newList = new SavedList(title, description, resumes)
        savedListContext.setSavedLists((lists) => [...lists, newList])
        navigate("/home/saved-lists")
    }





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
                            flex flex-row flex-grow w-[80%] rounded-r-full py-[1rem]"
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
        <div className="flex flex-col flex-grow">
            <div className="overflow-auto flex h-full w-full flex-row bg-white dark:bg-blue">
                <div className="text-2xl flex flex-col flex-grow" >
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
                    <div className="flex flex-col justify-center gap-[1.3rem] overflow-auto">
                        {resumes?.map((candidate) => <IndividualCandidateCard 
                            key={candidate.exactScore}
                            candidate={candidate}
                        />)}
                    </div>
                </div>  
                <div className="flex">
                    {showSidePanel ?
                        <div className="flex flex-row items-start">
                            <Button 
                                className="flex self-end bg-green dark:bg-white rounded-l-full py-[3rem] mb-[2rem]"
                                onClick={() => { setShowSidePanel(false) }}
                            >
                                <IonIcon icon={caretForwardOutline} className="self-center text-5xl" />
                            </Button>
                            <div className="flex flex-col h-full overflow-auto bg-green dark:bg-white py-[1rem] px-[2rem]">
                                <div className="flex flex-col pt-[1rem] pb-[1rem] gap-[4rem]">
                                    <InputBox
                                        title={"List Name"}
                                        placeholder={savedListContext.currentSavedList?.listName ? "" : "name"}
                                        onChange={
                                            (event) => {
                                                setTitle(event.target.value)
                                            }
                                        }
                                        value={title}
                                    />
                                    <MultilineInput
                                        title={"List Description"}
                                        placeholder={savedListContext.currentSavedList?.listDescription ? "" : "name"}
                                        onChange={
                                            (event) => {
                                                setDescription(event.target.value)
                                            }
                                        }
                                        value={description}
                                        height={8}
                                    />
                                </div>
                                <div className="flex flex-row flex-grow items-end pb-[1rem]">
                                    <Button
                                        className="flex flex-row gap-[1rem] bg-red dark:bg-yellow p-[0.5rem] rounded-[1rem]"
                                        onClick={() => { handleSaveList() }}
                                    >
                                        <div
                                            className="text-4xl self-center"
                                        >
                                            Save List
                                        </div>
                                        <IonIcon icon={saveOutline} className="self-center text-5xl"/>
                                    </Button>
                                </div>
                            </div>
                        </div>

                    :
                        <div className="flex flex-row items-start">
                            <Button 
                                className="flex self-end bg-green dark:bg-white rounded-l-full py-[3rem] mb-[2rem]"
                                onClick={() => { setShowSidePanel(true) }}
                            >
                                <IonIcon icon={caretBackOutline} className="self-center text-5xl" />
                            </Button>
                            <div className="flex w-[1rem] h-full bg-green dark:bg-white" />
                        </div>
                    }
                </div>
            </div>
        </div>
        
    );
}

export default ResultsScreen