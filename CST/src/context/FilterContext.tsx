import { ReactNode, createContext, useState } from "react"





export abstract class Filter {
    public readonly description;
    public readonly name
    public readonly quantity?

    constructor(name : string, description : string, quantity? : number) {
        this.name = name
        this.description = description
        this.quantity = quantity
    }
    
    public toString() {
        return `${this.name}: ${this.quantity} ${this.description}`
    }

    public equals(obj: Object) {
        const filter = obj as Filter

        if(filter) {
            return filter.name === this.name && filter.description === this.description && filter.quantity === this.quantity
        }

        return false
    }
}






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