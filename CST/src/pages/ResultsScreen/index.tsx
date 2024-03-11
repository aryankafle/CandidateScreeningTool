import React, { useContext, useEffect, useMemo, useState } from "react";
import Modal from '../../components/modals/Modal';
import { caretBackOutline, caretForwardOutline, saveOutline} from 'ionicons/icons';
import { IonIcon } from "@ionic/react";
import { closeCircleOutline } from "ionicons/icons";
import { SavedListsContext } from '../../context/SavedListsContext';
import { SelectionContext } from "../../context/SelectionContext";
import { Result, Grades } from "../../utils/Result";
import Button from "../../components/buttons/ImprovedButtonComponent";
import MultilineInput from "../../components/forms/MultilineInput"
import InputBox from "../../components/forms/InputBox";
import { useNavigate } from "react-router-dom";
import { FileContext } from "../../context/FileContext";
import { FilterContext } from "../../context/FilterContext";
import { SavedList } from "../../utils/SavedLIst";


const ResultsScreen = () => {
    const navigate = useNavigate()

    

    const [showModal, setShowModal] = useState(false);
    const [showSidePanel, setShowSidePanel] = useState(false);

    const savedListContext = useContext(SavedListsContext)
    const selectionContext = useContext(SelectionContext)
    const fileContext = useContext(FileContext)
    const filterContext = useContext(FilterContext)

    const [currentCandidate, setCurrentCandidate] = useState<Result>(new Result({name: "loading..."}, {} as File, [], "loading...", []))

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [resumes, setResumes] = useState([] as Result[])

    const [selectedResumes] = useState([] as Result[])

    const [listWithSameName, setListWithSameName] = useState<SavedList | undefined>(undefined)



    const isPreviousSavedList = useMemo(() => {
        if(!selectionContext.currentSavedList) {
            return false;
        }
        
        return savedListContext.savedLists.includes(selectionContext.currentSavedList)
    }, [savedListContext.savedLists, selectionContext.currentSavedList])

    const hasChangedFromPreviousSavedList = useMemo(() => {
        if(!isPreviousSavedList || !selectionContext.currentSavedList) {
            return undefined;
        }

        const thisList = selectionContext.currentSavedList

        if(thisList.listName !== title) return true
        if(thisList.listDescription !== description) return true
        // if(thisList.color !== color) return true

        return false;
        
    }, [description, isPreviousSavedList, selectionContext.currentSavedList, title])



    useEffect(() => {
        setTitle(selectionContext.currentSavedList?.listName ? selectionContext.currentSavedList?.listName : "")
        setDescription(selectionContext.currentSavedList?.listDescription ? selectionContext.currentSavedList?.listDescription : "")
        setResumes(selectionContext.currentSavedList?.orderedResumeList ? selectionContext.currentSavedList?.orderedResumeList : [])
    }, [selectionContext.currentSavedList])

    useEffect(() => {
        if(!selectionContext.currentSavedList) {
            throw new Error("No currently selected saved list.")
        }
// eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])





    const handleSaveList = () => {
        
        for(let i = 0; i < savedListContext.savedLists.length; i++) {
            if(savedListContext.savedLists[i].listName === title) {
                setListWithSameName(savedListContext.savedLists[i])
                return;
            }
        }

        const newList = new SavedList(title, description, resumes)
        savedListContext.setSavedLists((lists) => [...lists, newList])

        

        fileContext.setUploadedFiles([])
        fileContext.setCurrentBatchName("")
        fileContext.setCurrentFormData({} as FormData)

        filterContext.setSelectedFilters([])

        navigate("/home/saved-lists")
    }

    const handleReplaceListWithSameName = () => {
        savedListContext.setSavedLists((savedLists) => {
            let listIndex = -1
            if(listWithSameName) listIndex = savedLists.indexOf(listWithSameName)

            const newList = new SavedList(title, description, resumes)
            
            const temp = [...savedLists]
            temp.splice(listIndex, 1, newList)

            return temp
        })

        

        fileContext.setUploadedFiles([])
        fileContext.setCurrentBatchName("")
        fileContext.setCurrentFormData({} as FormData)

        filterContext.setSelectedFilters([])

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

    const CandidateDescriptionPopup = () => {
        return (
            <div className="border-gray-500 border-solid rounded-md self-center h-[60%] w-[80%] bg-grayDark dark:bg-grayDark">
                <div className='text-right text-3xl text-redS' onClick={() => setShowModal(false)}>
                    <IonIcon icon={closeCircleOutline}></IonIcon>
                </div>
                <div className="text-center text-2xl text-white">
                    {currentCandidate.applicant.name}
                </div>
                <div className="text-blueMid mx-4">
                    {currentCandidate.summary}
                </div>
                <div className="m-4 text-blueLight">
                    {currentCandidate.overallScore}
                </div>
            </div>
        )
    }

    const IndividualCandidateCard = (props: {candidate : Result}) => {

        return (
            <div 
                className=" bg-white
                            flex flex-row flex-grow w-[80%] rounded-r-full py-[1rem]"
                onClick={() => {
                    setShowModal(true)
                    setCurrentCandidate(props.candidate)
                }}
            >
                <div className="flex flex-grow self-center justify-center">
                    {props.candidate.applicant.name || "asdf"}
                </div>
                <div className="pr-[2rem] bor">
                    { getRatingImage(props.candidate.grade ) || "asdf" }
                </div>
            </div>
        )
    }



    return (
        <div className="flex flex-col flex-grow">
            <div className="overflow-clip flex h-full w-full flex-row bg-white dark:bg-blueDark">
                {showModal && 
                    <Modal modalTrigger={showModal} onClose={()=>{setShowModal(false)}}>
                        <CandidateDescriptionPopup />
                    </Modal>
                }
                {listWithSameName &&
                    <Modal modalTrigger={!!listWithSameName} onClose={()=>{setListWithSameName(undefined)}}>
                        <div className="flex flex-col h-[60%] w-[60%] bg-green dark:bg-grayDark self-center">
                            <div className="text-grayLight leading-10 text-center">
                                You already have a saved list named {title}.
                            </div>
                            <div className="text-grayLight leading-10 mx-2 underline"
                                onClick={() => setListWithSameName(undefined)}
                            >
                                Go back
                            </div>
                            <div className="text-blueLight leading-10 mx-2 underline"
                                onClick={handleReplaceListWithSameName}
                            >
                                Replace existing list (name: {listWithSameName.listName}, description: {listWithSameName.listDescription})
                            </div>
                        </div>
                    </Modal>
                }
                <div className="overflow-auto h-full text-2xl flex flex-col flex-grow" >
                    
                    <div className="flex my-10 max-w-screen-sm p-6 dark:bg-white bg-blue rounded-r-full">
                        <h1>Here are some great candidates based on your needs:</h1>
                    </div>
                    <div className="flex flex-col justify-center gap-[1.3rem]">
                        {resumes?.map((candidate) => <IndividualCandidateCard 
                            key={candidate.id}
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
                                        placeholder={selectionContext.currentSavedList?.listName ? "" : "name"}
                                        onChange={
                                            (event) => {
                                                setTitle(event.target.value)
                                            }
                                        }
                                        value={title}
                                    />
                                    <MultilineInput
                                        title={"List Description"}
                                        placeholder={selectionContext.currentSavedList?.listDescription ? "" : "name"}
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
                                    {!isPreviousSavedList &&
                                        <Button
                                            className="flex flex-row gap-[1rem] bg-red dark:bg-blueLight p-[0.5rem] rounded-[1rem]"
                                            onClick={() => { handleSaveList() }}
                                        >
                                            <div
                                                className="text-4xl self-center"
                                            >
                                                {"Save List"}
                                            </div>
                                            <IonIcon icon={saveOutline} className="self-center text-5xl"/>
                                        </Button>
                                    }
                                    {isPreviousSavedList && (hasChangedFromPreviousSavedList || selectedResumes.length > 0) &&
                                        <Button
                                            className="flex flex-row gap-[1rem] bg-red dark:bg-blueLight p-[0.5rem] rounded-[1rem]"
                                            onClick={() => { handleSaveList() }}
                                        >
                                            <div
                                                className="text-1xl self-center"
                                            >
                                                {"Save As New List"}
                                            </div>
                                            <IonIcon icon={saveOutline} className="self-center text-5xl"/>
                                        </Button> 
                                    }
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