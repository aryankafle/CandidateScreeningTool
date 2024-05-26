import React, { useCallback, useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import uFuzzy from "@leeoniya/ufuzzy"

import { getRatingImage } from "../../utils/GetRatingImage";

import { Filter } from "../../utils/Filter";
import { SavedList } from "../../utils/SavedList";
import Result, { LetterGrade } from "../../utils/Result";

import { runPromisesInParallel } from "../../utils/ParallelPromises";

import useWeighedScores from "../../hooks/UseWeighedScores";

import { SavedListsContext } from '../../context/SavedListsContext';
import UserContext from "../../context/UserContext";
import SelectionContext from "../../context/SelectionContext";
import BatchContext from '../../context/BatchContext';


import {
    
    saveList,
    deleteSavedList,
    getExternalList,
    createResumeResult,
    getResumeResult,
    downloadResume

} from "../../requests/ResumeRequests";





const ResultsScreen = () => {

    const navigate = useNavigate()

    

    const { userData } = useContext(UserContext)

    const { 
        
        currentSavedList,
        savedLists,
    
    } = useContext(SavedListsContext)

    const {

        selectedFilters,
        setPreviouslySelectedFilters

    } = useContext(SelectionContext)

    const {

        fileIDs,

    } = useContext(BatchContext)





    const [ title, setTitle ] = useState(currentSavedList?.name || "")
    const [ description, setDescription ] = useState(currentSavedList?.description || "")
    const [ color, setColor ] = useState(currentSavedList?.color || "")



    const saveCurrentList = () => saveList( title, description, color, results, userData.id )



    const getListWithSameName = useCallback(() => savedLists.find(savedList => savedList.name === title), [savedLists, title])

    const replaceResumeWithSameName = useCallback(async (listWithSameName : SavedList) => {

        await deleteSavedList(listWithSameName._id, userData.id)

        await saveCurrentList()
        
    }, [saveCurrentList, userData])



    const [results, setResults] = useState<Result[]>([])
    const weighedResults = useWeighedScores(results)

    const [resumes, setResumes] = useState<File[]>([])


    const { paramListID } = useParams();





    const getResultsFromFilters = useCallback(async (filters : Filter[]) => {

        const promises = fileIDs
        .map(async fileID => {

            const result = await createResumeResult(filters, fileID, userData.id)

            setResults(prevResults => [...prevResults, result])

            const resume = await downloadResume(fileID, userData.id)
            
            setResumes(prevResumes => [...prevResumes, resume])
        
        })

        await runPromisesInParallel(promises)

    }, [fileIDs, userData.id, setResults])



    const getResultsFromPreviousSavedList = useCallback(async (previousList : SavedList) => {

        const promises = previousList.file_ids
        .map(async fileID => {

            const result = await getResumeResult(fileID, previousList._id, userData.id)

            setResults(prevResults => [...prevResults, result])

            const resume = await downloadResume(fileID, userData.id)
            
            setResumes(prevResumes => [...prevResumes, resume])
        
        })

        await runPromisesInParallel(promises)

    }, [userData.id, setResults])

    const getResultsFromListID = useCallback(async (listID : string) => {

        const savedList = await getExternalList(listID)

        await getResultsFromPreviousSavedList(savedList)

    }, [getResultsFromPreviousSavedList])




 
    useEffect(() => {

        if(currentSavedList) {

            getResultsFromPreviousSavedList(currentSavedList)
            return;

        }

        if(paramListID) {

            getResultsFromListID(paramListID)
            return

        }

        getResultsFromFilters(selectedFilters)

    }, [paramListID, getResultsFromListID, getResultsFromFilters, selectedFilters, currentSavedList, getResultsFromPreviousSavedList])



    useEffect(() => {

        setPreviouslySelectedFilters([...selectedFilters])

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])





    

    return <div></div>
}

export default ResultsScreen