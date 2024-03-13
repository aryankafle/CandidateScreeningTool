import { ReactNode, SetStateAction, createContext, useEffect, useState, useContext } from "react"
import { Filter } from "../utils/Filter"
import { SavedList } from "../utils/SavedList"

import { postUserCurrentSavedList, postUserLocation } from "../requests/ResumeRequests"
import { UserContext } from "./UserContext"








type SelectionContextType = {

    previouslySelectedFilters : Filter[]
    setPreviouslySelectedFilters : React.Dispatch<SetStateAction<Filter[]>>

    currentSavedList : SavedList,
    setCurrentSavedList : React.Dispatch<SetStateAction<SavedList>>,
    
    previouslySavedFiles : File[],
    setPreviouslySavedFiles : React.Dispatch<SetStateAction<File[]>>,

    location : string,
    setLocation : React.Dispatch<SetStateAction<string>>

}

const SelectionContextInitial = {

    previouslySelectedFilters : [] as Filter[],
    setPreviouslySelectedFilters : {} as React.Dispatch<SetStateAction<Filter[]>>,

    currentSavedList : {} as SavedList,
    setCurrentSavedList : {} as React.Dispatch<SetStateAction<SavedList>>,

    previouslySavedFiles : [],
    setPreviouslySavedFiles : {} as React.Dispatch<SetStateAction<File[]>>,

    location : "",
    setLocation : {} as React.Dispatch<SetStateAction<string>>

}





export const SelectionContext = createContext<SelectionContextType>(SelectionContextInitial)

const SelectionContextProvider = (props: { children : ReactNode }) => {

    const { userData } = useContext(UserContext) 

    const [ location, setLocation ] = useState<string>("")

    useEffect(() => {

        if(!userData || !location || location === null || location === "/") return;

        postUserLocation(userData.id, location)
    
    }, [location, userData])
    


    const [previouslySelectedFilters, setPreviouslySelectedFilters] = useState<Filter[]>([])



    const [currentSavedList, setCurrentSavedList] = useState<SavedList>({} as SavedList)

    const [previouslySavedFiles, setPreviouslySavedFiles] = useState([] as File[])

    useEffect(() => {

        if(!userData) return;

        postUserCurrentSavedList(userData.id, currentSavedList)
    
    }, [currentSavedList, userData])
    


    return (
        <SelectionContext.Provider value={{
                previouslySelectedFilters, setPreviouslySelectedFilters,
                currentSavedList, setCurrentSavedList, 
                previouslySavedFiles, setPreviouslySavedFiles,
                location, setLocation 
            }}>
            {props.children}
        </SelectionContext.Provider>
    )

}

export default SelectionContextProvider