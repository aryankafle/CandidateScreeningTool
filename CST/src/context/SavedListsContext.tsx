import { ReactNode, createContext, useState } from "react"
import { SavedList } from "../utils/SavedLIst"





type SavedListsContextType = {

    savedLists : SavedList[]
    setSavedLists : React.Dispatch<React.SetStateAction<SavedList[]>>

}

const SavedListsContextInitial = {

    savedLists: [] as SavedList[],
    setSavedLists: {} as React.Dispatch<React.SetStateAction<SavedList[]>>,

}





export const SavedListsContext = createContext<SavedListsContextType>(SavedListsContextInitial)

const SavedListsContextProvider = (props: { children : ReactNode }) => {

    const [savedLists, setSavedLists] = useState([] as SavedList[])
    
    return (
        <SavedListsContext.Provider value={{savedLists, setSavedLists}}>
            {props.children}
        </SavedListsContext.Provider>
    )

}

export default SavedListsContextProvider