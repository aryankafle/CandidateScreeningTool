import { ReactNode, SetStateAction, createContext, useEffect, useState, useContext } from "react"
import { Filter } from "../utils/Filter"
import { SavedList } from "../utils/SavedList"

import { postUserCurrentSavedList, postUserLocation } from "../requests/ResumeRequests"
import { UserContext } from "./UserContext"








type SelectionContextType = {

    previouslySelectedFilters : Filter[]
    setPreviouslySelectedFilters : React.Dispatch<SetStateAction<Filter[]>>

    previouslySavedList : SavedList,
    setPreviouslySavedList : React.Dispatch<SetStateAction<SavedList>>,

    currentSavedList : SavedList,
    setCurrentSavedList : React.Dispatch<SetStateAction<SavedList>>,

    location : string,
    setLocation : React.Dispatch<SetStateAction<string>>

}

const SelectionContextInitial = {

    previouslySelectedFilters : [] as Filter[],
    setPreviouslySelectedFilters : {} as React.Dispatch<SetStateAction<Filter[]>>,

    previouslySavedList : {} as SavedList,
    setPreviouslySavedList : {} as React.Dispatch<SetStateAction<SavedList>>,

    currentSavedList : {} as SavedList,
    setCurrentSavedList : {} as React.Dispatch<SetStateAction<SavedList>>,

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



    const [previouslySavedList, setPreviouslySavedList] = useState<SavedList>({} as SavedList)

    const [currentSavedList, setCurrentSavedList] = useState<SavedList>({} as SavedList)

    useEffect(() => {

        if(!userData) return;

        postUserCurrentSavedList(userData.id, currentSavedList)
    
    }, [currentSavedList, userData])
    


    return (
        <SelectionContext.Provider value={{
                previouslySelectedFilters, setPreviouslySelectedFilters,
                previouslySavedList, setPreviouslySavedList,
                currentSavedList, setCurrentSavedList, 
                location, setLocation 
            }}>
            {props.children}
        </SelectionContext.Provider>
    )

}

export default SelectionContextProvider