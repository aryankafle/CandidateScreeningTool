import { ReactNode, SetStateAction, createContext, useState } from "react"

import { SavedList } from "../utils/SavedList"





const SavedListsContextInitial = {

    savedLists: [] as SavedList[],
    setSavedLists: {} as React.Dispatch<React.SetStateAction<SavedList[]>>,

    currentSavedList : undefined as SavedList | undefined,
    setCurrentSavedList : {} as React.Dispatch<SetStateAction<SavedList | undefined>>,

}

type SavedListsContextType = typeof SavedListsContextInitial





export const SavedListsContext = createContext<SavedListsContextType>(SavedListsContextInitial)

export default SavedListsContext



export const SavedListsContextProvider = (props: { children : ReactNode }) => {

    const [savedLists, setSavedLists] = useState(SavedListsContextInitial.savedLists)

    const [currentSavedList, setCurrentSavedList] = useState(SavedListsContextInitial.currentSavedList)

    

    
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