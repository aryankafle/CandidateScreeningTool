import { ReactNode, SetStateAction, createContext, useMemo, useState } from "react"
import { Filter } from "./FilterContext"
import { SavedList } from "./SavedListsContext"





type SelectionContextType = {

    previouslySelectedFilters : Filter[]
    setPreviouslySelectedFilters : React.Dispatch<SetStateAction<Filter[]>>

    previouslySavedList : SavedList,
    setPreviouslySavedList : React.Dispatch<SetStateAction<SavedList>>,

}

const SelectionContextInitial = {

    previouslySelectedFilters : [] as Filter[],
    setPreviouslySelectedFilters : {} as React.Dispatch<SetStateAction<Filter[]>>,

    previouslySavedList : {} as SavedList,
    setPreviouslySavedList : {} as React.Dispatch<SetStateAction<SavedList>>,

}





export const SelectionContext = createContext<SelectionContextType>(SelectionContextInitial)

const SelectionContextProvider = (props: { children : ReactNode }) => {

    const [previouslySelectedFilters, setPreviouslySelectedFilters] = useState<Filter[]>([])

    const [previouslySavedList, setPreviouslySavedList] = useState<SavedList>({} as SavedList)
    
    return (
        <SelectionContext.Provider value={{ previouslySelectedFilters, setPreviouslySelectedFilters, previouslySavedList, setPreviouslySavedList }}>
            {props.children}
        </SelectionContext.Provider>
    )

}

export default SelectionContextProvider