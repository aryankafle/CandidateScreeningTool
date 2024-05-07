import { ReactNode, SetStateAction, createContext, useContext, useEffect, useState } from "react"

import { SavedList } from "../utils/SavedList"

import { postUserCurrentSavedList } from "../requests/ResumeRequests"

import UserContext from "./UserContext"
import FlagContext from "./FlagContext"





const SavedListsContextInitial = {

    savedLists: [] as SavedList[],
    setSavedLists: {} as React.Dispatch<React.SetStateAction<SavedList[]>>,

    currentSavedList : {} as SavedList | undefined,
    setCurrentSavedList : {} as React.Dispatch<SetStateAction<SavedList | undefined>>,

}

type SavedListsContextType = typeof SavedListsContextInitial





export const SavedListsContext = createContext<SavedListsContextType>(SavedListsContextInitial)

export default SavedListsContext



export const SavedListsContextProvider = (props: { children : ReactNode }) => {

    const { userData } = useContext(UserContext)

    const { flags } = useContext(FlagContext)



    const [savedLists, setSavedLists] = useState(SavedListsContextInitial.savedLists)

    const [currentSavedList, setCurrentSavedList] = useState(SavedListsContextInitial.currentSavedList)





    useEffect(() => {

        if(!userData) return;

        if(!currentSavedList) return;

        postUserCurrentSavedList(userData.id, currentSavedList)
    
    }, [currentSavedList, flags.active, userData])


    

    
    return (
        <SavedListsContext.Provider
            
            value={{
            
                savedLists, setSavedLists,
                currentSavedList, setCurrentSavedList
            
            }}

        >

            {props.children}

        </SavedListsContext.Provider>
    )

}