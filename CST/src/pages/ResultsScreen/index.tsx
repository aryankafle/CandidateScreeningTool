import type { SavedList } from "../../utils/SavedList";

import React, { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { caretBackOutline, caretForwardOutline, helpCircleOutline, saveOutline } from 'ionicons/icons';
import { IonIcon } from "@ionic/react";
import { closeCircleOutline } from "ionicons/icons";
import { SavedListsContext } from '../../context/SavedListsContext';
import Result, { LetterGrade, getResults } from "../../utils/Result";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import UserContext from "../../context/UserContext";
import { saveList, deleteSavedList, getExternalList } from "../../requests/ResumeRequests";
import uFuzzy from "@leeoniya/ufuzzy"
import BatchContext from '../../context/BatchContext';
import useWeighedScores, { WeighedResult } from "../../hooks/UseWeighedScores";
import SelectionContext from "../../context/SelectionContext";
import { useParams } from "react-router-dom";

import AGrade from "../../assets/a-rating.png"
import BGrade from "../../assets/b-rating.png"
import CGrade from "../../assets/c-rating.png"
import DGrade from "../../assets/d-rating.png"
import FGrade from "../../assets/f-rating.png"



const ResultsScreen = () => {

    const navigate = useNavigate()

    

    const { 
        
        currentSavedList, setCurrentSavedList,
        savedLists, setSavedLists
    
    } = useContext(SavedListsContext)

    const {

        batchResults,
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

        
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        
        if(!userData || !currentSavedList || batchResults.length > 0 ) return;

        getResults(currentSavedList, userData.id)
        .then(results => setBatchResults(results))

    }, [batchResults.length, currentSavedList, setBatchResults, userData])
    
    useEffect(() => {

        if (!listID) {
            return
        }

        getExternalList(listID)
        .then(async (savedList) => {

            setCurrentSavedList(savedList)

        })
        
        
    }, [listID, setCurrentSavedList])

    

    


    const handleSaveList = async () => {
        
        let listWithSameName;

        for(let i = 0; i < savedLists.length; i++) {

            if(savedLists[i].name.trim() === title.trim() && title !== "") {
                
                setListWithSameName(listWithSameName)
                return;

            }

        }

        await saveList(title, description, color, batchResults, userData.id)



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
                return <img alt="'A' Rating" src={AGrade}
                            className="self-center w-[4rem] h-[4rem]"
                />;
            case LetterGrade.B:
                return <img alt="'B' Rating" src={BGrade}
                            className="self-center w-[4rem] h-[4rem]"
                />;
            case LetterGrade.C:
                return <img alt="'C' Rating" src={CGrade}
                            className="self-center w-[4rem] h-[4rem]"
                />;
            case LetterGrade.D:
                return <img alt="'D' Rating" src={DGrade}
                            className="self-center w-[4rem] h-[4rem]"
                />;
            case LetterGrade.F:
                return <img alt="'F' Rating" src={FGrade}
                            className="self-center w-[4rem] h-[4rem]"
                />;
            default:
                throw new Error(`Grade: ${grade} is out of range!`)
        }
    }

    return <div></div>
}

export default ResultsScreen