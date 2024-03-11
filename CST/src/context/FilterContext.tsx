import { ReactNode, createContext, useState } from "react"
import { Filter } from "../utils/Filter";





type FilterContextType = {

    selectedFilters: Filter[]
    setSelectedFilters: React.Dispatch<React.SetStateAction<Filter[]>>

}

const FilterContextInitial = {

    selectedFilters: [] as Filter[],
    setSelectedFilters: {} as React.Dispatch<React.SetStateAction<Filter[]>>

}





export const FilterContext = createContext<FilterContextType>(FilterContextInitial)

const FilterContextProvider = (props: { children : ReactNode }) => {

    const [selectedFilters, setSelectedFilters] = useState([] as Filter[])
    
    return (
        <FilterContext.Provider value={{selectedFilters, setSelectedFilters}}>
            {props.children}
        </FilterContext.Provider>
    )

}

export default FilterContextProvider