import { ReactNode, SetStateAction, createContext, useEffect, useState, useContext } from "react"
import { Filter } from "./FilterContext"
import { SavedList } from "./SavedListsContext"

import { useLocation, Location } from "react-router-dom"
import { postUserCurrentSavedList, postUserLocation } from "../requests/ResumeRequests"
import { UserContext } from "./UserContext"








type SelectionContextType = {

    previouslySelectedFilters : Filter[]
    setPreviouslySelectedFilters : React.Dispatch<SetStateAction<Filter[]>>

    previouslySavedList : SavedList,
    setPreviouslySavedList : React.Dispatch<SetStateAction<SavedList>>,

    currentSavedList : SavedList,
    setCurrentSavedList : React.Dispatch<SetStateAction<SavedList>>,

    location : Location<any>,
    setLocation : React.Dispatch<SetStateAction<Location<any>>>

}

const SelectionContextInitial = {

    previouslySelectedFilters : [] as Filter[],
    setPreviouslySelectedFilters : {} as React.Dispatch<SetStateAction<Filter[]>>,

    previouslySavedList : {} as SavedList,
    setPreviouslySavedList : {} as React.Dispatch<SetStateAction<SavedList>>,

    currentSavedList : {} as SavedList,
    setCurrentSavedList : {} as React.Dispatch<SetStateAction<SavedList>>,

    location : {} as Location<any>,
    setLocation : {} as React.Dispatch<SetStateAction<Location<any>>>

}





export const SelectionContext = createContext<SelectionContextType>(SelectionContextInitial)

const SelectionContextProvider = (props: { children : ReactNode }) => {

    const { userData } = useContext(UserContext) 

    const [ location, setLocation ] = useState<Location>({} as Location)

    useEffect(() => {

        if(!userData || !location) return;

        postUserLocation(userData.id, location)
    
    }, [location, userData])
    


    const [previouslySelectedFilters, setPreviouslySelectedFilters] = useState<Filter[]>([])



    const [previouslySavedList, setPreviouslySavedList] = useState<SavedList>({} as SavedList)

    const [currentSavedList, setCurrentSavedList] = useState<SavedList>({} as SavedList)

    useEffect(() => {

        if(!userData || !location) return;

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