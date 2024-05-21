import type { SavedList } from "../../utils/SavedList";

import React, { useCallback, useContext, useEffect, useMemo, useState } from "react";
import Modal from '../../components/modals/Modal';
import { caretBackOutline, caretForwardOutline, helpCircleOutline, saveOutline } from 'ionicons/icons';
import { IonIcon } from "@ionic/react";
import { closeCircleOutline } from "ionicons/icons";
import { SavedListsContext } from '../../context/SavedListsContext';
import Result, { LetterGrade } from "../../utils/Result";
import Button from "../../components/buttons/ImprovedButtonComponent";
import MultilineInput from "../../components/forms/MultilineInput"
import InputBox from "../../components/forms/InputBox";
import { useNavigate } from "react-router-dom";
import UserContext from "../../context/UserContext";
import { saveList, deleteSavedList, getExternalList, createResumeResult, getResumeResult } from "../../requests/ResumeRequests";
import { useSelectableList } from "../../hooks/SelectableList";
import uFuzzy from "@leeoniya/ufuzzy"
import BatchContext from '../../context/BatchContext';
import useWeighedScores, { WeighedResult } from "../../hooks/UseWeighedScores";
import { WeighedScores } from '../../utils/Result';
import SelectionContext from "../../context/SelectionContext";
import { useParams } from "react-router-dom";



const ResultsScreen = () => {

    const navigate = useNavigate()

    

    const { 
        
        currentSavedList, setCurrentSavedList,
        savedLists, setSavedLists
    
    } = useContext(SavedListsContext)

    const {

        batchResults,
        fileIDs,
        clearBatchContext,
        setBatchResults

    } = useContext(BatchContext)

    const { setPreviouslySelectedFilters, selectedFilters } = useContext(SelectionContext)

    const { userData } = useContext(UserContext)

    const { listID } = useParams();





    const [ title, setTitle ] = useState(currentSavedList?.name || "")
    const [ description, setDescription ] = useState(currentSavedList?.description || "")
    const [ color, setColor ] = useState(currentSavedList?.color || "")



    const weighedResults = useWeighedScores(batchResults)



    const hasChangedFromPreviousSavedList = useMemo(() => {

        const oldList = currentSavedList



        if(!oldList) return true;

        if(oldList.name !== title) return true

        // if(oldList.color !== color) return 
        
        if(oldList.description !== description) return true

        if(oldList.file_ids.some((fileID) => batchResults.some(result => result._id !== fileID))) return true

        return false
        
    }, [description, batchResults, currentSavedList, title])



    const [ selectedResults, setSelectedResults] = useState([] as Result[]);

    const [previouslySelectedIndex, setPreviouslySelectedIndex] = useState(0)



    const [ instructionsPanelClicked, setInstructionsPanelClicked ] = useState(false)

    const [ showModal, setShowModal ] = useState(false);
    const [ showSidePanel, setShowSidePanel ] = useState(false);

    const [ currentlyViewedResult, setCurrentlyViewedResult ] = useState<WeighedResult>({} as WeighedResult)



    const [ listWithSameName, setListWithSameName ] = useState<SavedList | undefined>(undefined)



    const [ searchQuery, setSearchQuery ] = useState("")

    const [ fuzzySearchResumes, setFuzzySearchResumes ] = useState([] as Result[])











    useEffect(() => {

        setPreviouslySelectedFilters([...selectedFilters])
        
    }, [])


    useEffect(() => {

        if (!userData || !listID) {
            return
        }

        getExternalList(listID).then(async (savedList) => {
            setCurrentSavedList(savedList)
            console.log(savedList)
            await createBatchResults(savedList.file_ids, userData.id)
        }).catch((error) => {
            console.log(error)
        })
        
    }, [userData])





    const createBatchResults = async (ids : string[], userid : string) => {

        const scoredResumePromises = ids.map( id => getResumeResult(id, userid ) )

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






    const {

        selectableItems,

        getAllSelectedItems,

        selectAll,
        removeCurrentSelectionFromList,
        
        handleShiftClickSelect,
        handleCtrlKeySelect,
        handleSelectionOnKeyDown,

    } = useSelectableList<Result>(selectedResults, setSelectedResults)



    const handleKeyDown = useCallback((event : KeyboardEvent) => {
        if(event.key === "Delete") {
            removeCurrentSelectionFromList()
        }
        handleSelectionOnKeyDown(event)
    }, [removeCurrentSelectionFromList, handleSelectionOnKeyDown])


    const handleSelectionOnClick = useCallback((event : React.MouseEvent<any, MouseEvent>, itemIndex : number) => {

        if (event.shiftKey) {
            handleShiftClickSelect(itemIndex);
        }
        else if (event.ctrlKey) {
            handleCtrlKeySelect(itemIndex);
        }

        setPreviouslySelectedIndex(itemIndex);
    }, [handleCtrlKeySelect, handleShiftClickSelect])
    

    

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown)

        return () => {
            window.removeEventListener("keydown", handleKeyDown)
        }

    }, [handleKeyDown])
    


    const handleSaveList = async () => {
        
        let listWithSameName;

        for(let i = 0; i < savedLists.length; i++) {

            if(savedLists[i].name.trim() === title.trim() && title !== "") {
                
                setListWithSameName(listWithSameName)
                return;

            }

        }

        await saveList(title, description, color, fileIDs, userData.id)



        clearBatchContext()
        setCurrentSavedList(undefined)

        navigate("/home/saved-lists")

    }

    const handleReplaceListWithSameName = async () => {

        if(!listWithSameName) return;

        await deleteSavedList(listWithSameName._id, userData._id)

        setSavedLists(
            (savedLists) => [...savedLists].filter(list => list._id !== listWithSameName._id)
        )

        handleSaveList()

    }





    const getRatingImage = (grade : LetterGrade) => {
        switch(grade) {
            case LetterGrade.A:
                return <img alt="'A' Rating" src="assets/a-rating.png"
                            className="self-center w-[4rem] h-[4rem]"
                />;
            case LetterGrade.B:
                return <img alt="'B' Rating" src="assets/b-rating.png"
                            className="self-center w-[4rem] h-[4rem]"
                />;
            case LetterGrade.C:
                return <img alt="'C' Rating" src="assets/c-rating.png"
                            className="self-center w-[4rem] h-[4rem]"
                />;
            case LetterGrade.D:
                return <img alt="'D' Rating" src="assets/d-rating.png"
                            className="self-center w-[4rem] h-[4rem]"
                />;
            case LetterGrade.F:
                return <img alt="'F' Rating" src="assets/f-rating.png"
                            className="self-center w-[4rem] h-[4rem]"
                />;
            default:
                throw new Error(`Grade: ${grade} is out of range!`)
        }
    }

    const CandidateDescriptionPopup = (props: {result : WeighedResult}) => {

        const summaries = useMemo(() => {

            const summariesArr = []

            for(const summary in props.result.summaries) {
                summariesArr.push({section: props.result.summaries[summary], text: summary})
            }

            return summariesArr

        }, [props.result])

        

        return (
            <div className="border-gray border-solid rounded-md self-center flex flex-col w-[60%] max-h-[80%] bg-grayDark dark:bg-grayDark overflow-auto">
                <div className='text-right text-3xl text-grayMid hover:text-redS' onClick={() => setShowModal(false)}>
                    <IonIcon icon={closeCircleOutline}></IonIcon>
                </div>
                <div className="text-center text-2xl text-white font-bold">
                    {props.result.applicant.name}
                </div>
                {
                    summaries.map((summary : any) => (
                        <>
                            <div className="text-grayLight mx-4">
                                {summary.text}
                            </div>
                            <div className="text-grayMid mx-6">
                                {summary.section}
                            </div>
                        </>
                    ))
                }
                <div className="m-4 text-blueLight">
                    {props.result.overall}
                </div>
            </div>
        )

    }

    const IndividualCandidateCard = (props: {result : WeighedResult}) => {

        return (
            <div 
                className=" bg-grayMidDark text-4xl
                            flex flex-row flex-grow w-[80%] rounded-r-3xl py-[1rem]"
                onClick={() => {
                    setShowModal(true)
                    setCurrentlyViewedResult(props.result)
                }}
            >
                <div className="flex flex-grow self-center justify-center text-white">
                    {props.result.applicant.name || "asdf"}
                </div>
                <div className="pr-[2rem] bor">
                    { getRatingImage(props.result.grade ) || "asdf" }
                </div>
            </div>
        )
    }

    useEffect(() => {
        const haystack = batchResults.map(r => `${r.applicant.name}¦${r.summary}`)
        const needle = searchQuery
        const opts = {}
        const uf = new uFuzzy(opts)
        const idxs = uf.filter(haystack, needle)
        if (idxs != null && idxs.length > 0) {
            let infoThresh = 1e3;
            if (idxs.length <= infoThresh) {
                let info = uf.info(idxs, haystack, needle);
                let order = uf.sort(info, haystack, needle);
                for (let i = 0; i < order.length; i++) {
                    // for (let u = 0; u < resumes.length; u++) {
                    //     if
                    // }
                    console.log(haystack[info.idx[order[i]]]);
                }
            }
            else {
                    for (let i = 0; i < idxs.length; i++) {
                        console.log(haystack[idxs[i]]);
                    }
                }
            }
        else {
            setFuzzySearchResumes(batchResults)
        }
    }, [batchResults, searchQuery])


    const InstructionPanel = () => {
        return(
            <div className="bg-white dark:bg-grayDark
                            flex flex-col self-center text-3xl
                            max-w-5xl">
                <div className="flex justify-center text-white p-10">
                    This page contains the results of your filters being applied to the submitted resumes. 
                    Clicking on individual cards for candidates will bring up a summary of their resume,
                    alongside an OpenAI generated score of the resume based on the filters. You can input a 
                    search query into the search bar in order to search through the resumes for a certain word or name.
                    Click the tab at the bottom of the screen to be able to save this list of resumes and results, 
                    giving the list a name, the batch name by default, and a description of the list. When you are done
                    browsing through this list, you can click the "Home" button at the top right of the screen to return
                    to the resume upload page.
                </div>

                <Button className="flex flex-col justify-center text-black dark:text-white pb-3" onClick={()=> setInstructionsPanelClicked(false)}>
                    OK
                </Button>
            </div>
        )
    }
    



    return (
        <div className="flex flex-col flex-grow">
            <div className="overflow-clip flex h-full w-full flex-row bg-white dark:bg-grayDark">
                {showModal && 
                    <Modal modalTrigger={showModal} onClose={()=>{setShowModal(false)}}>
                        <CandidateDescriptionPopup result={currentlyViewedResult} />
                    </Modal>
                }
                {listWithSameName &&
                    <Modal modalTrigger={!!listWithSameName} onClose={()=>{setListWithSameName(undefined)}}>
                        <div className="flex flex-col h-[80%] w-[60%] bg-green dark:bg-grayDark self-center border-2 border-grayMid rounded">
                            <div className="text-grayLight leading-10 text-center text-lg">
                                You already have a saved list named {title}.
                            </div>
                            <div className="text-grayLight leading-10 hover:text-grayMid mx-10 font-bold"
                                onClick={() => setListWithSameName(undefined)}
                            >
                                Go back
                            </div>
                            <div className="text-blueLight leading-10 hover:text-blueMid mx-10 font-bold"
                                onClick={handleReplaceListWithSameName}
                            >
                                Replace existing list (name: {listWithSameName.name}, description: {listWithSameName.description})?
                            </div>
                        </div>
                    </Modal>
                }
                <div className="overflow-auto h-full text-2xl flex flex-col flex-grow" >
                    
                    <div className="flex flex-row justify-center text-white text-4xl my-10">
                        <h1>Here are some great candidates based on your needs:</h1>
                        <IonIcon className="text-4xl text-white flex justify-center ml-2" icon={helpCircleOutline} onClick={() => setInstructionsPanelClicked(true)} />
                    </div>
                    {instructionsPanelClicked && 
                        <Modal modalTrigger={instructionsPanelClicked} onClose={()=>{setInstructionsPanelClicked(false)}}>
                            <InstructionPanel />
                        </Modal>
                    }

                    <div className="flex flex-row justify-center mb-5">
                        <div className="mb-3 xl:w-96">
                            <input
                                type="search"
                                className=" relative m-0 block w-full min-w-0 flex-auto 
                                            rounded border border-solid border-black bg-transparent bg-clip-padding px-3 py-[0.25rem] 
                                            text-base font-normal leading-[1.6] text-neutral-700 outline-none 
                                            transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none 
                                            dark:border-white dark:text-white dark:placeholder:text-neutral-200 dark:focus:border-primary"
                                id="exampleSearch"
                                placeholder="Type search query" 
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)} />
                        </div>
                    </div>

                    <div className=
                    {
                        true?
                        `flex flex-col justify-center gap-[1.3rem] text-red`
                        :
                        "flex flex-col justify-center gap-[1.3rem] text-white"
                    }
                    >
                        {weighedResults.map(result => <IndividualCandidateCard 
                            key={result.applicant.name + Math.random()*9999}
                            result={result}
                            //selected={selectableItems[index].isSelected}
                        />)}
                    </div>
                </div>  
                <div className="flex">
                    {showSidePanel ?
                        <div className="flex flex-row items-start">
                            <Button 
                                className="flex self-end bg-green dark:bg-grayMidDark rounded-l-full py-[3rem] mb-[2rem]"
                                onClick={() => { setShowSidePanel(false) }}
                            >
                                <IonIcon icon={caretForwardOutline} className="self-center text-5xl text-white" />
                            </Button>
                            <div className="flex flex-col h-full overflow-auto bg-grayLight dark:bg-grayMidDark py-[1rem] px-[4rem] rounded-tl-lg">
                                <div className="flex flex-col py-[1rem] gap-[4rem] text-white">
                                    <InputBox
                                        title={"List Name"}
                                        placeholder={currentSavedList?.name ? "" : "Name"}
                                        onChange={
                                            (event) => {
                                                setTitle(event.target.value)
                                            }
                                        }
                                        value={title}
                                    />
                                    <MultilineInput
                                        title={"List Description"}
                                        placeholder={currentSavedList?.description ? "" : "Description"}
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
                                    { ( !currentSavedList && hasChangedFromPreviousSavedList ) &&
                                        <Button
                                            className="flex flex-row gap-[1rem] border border-white text-white p-[0.5rem] rounded-[1rem] hover:bg-grayDark"
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
                                    { ( (currentSavedList && hasChangedFromPreviousSavedList) || (selectedResults.length > 0) ) &&
                                        <Button
                                            className="flex flex-row gap-[1rem] bg-red dark:bg-blueLight p-[0.5rem] rounded-[1rem] border-2"
                                            onClick={() => { handleSaveList() }}
                                        >
                                            <div
                                                className="text-1xl self-center font-semibold"
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
                                className="flex self-end bg-green dark:bg-grayMidDark rounded-l-full py-[3rem] mb-[2rem]"
                                onClick={() => { setShowSidePanel(true) }}
                            >
                                <IonIcon icon={caretBackOutline} className="self-center text-5xl text-white" />
                            </Button>
                        </div>
                    }
                </div>
            </div>
        </div>
        
    );
}

export default ResultsScreen