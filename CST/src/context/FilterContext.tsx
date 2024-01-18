import { ReactNode, createContext, useState } from "react"





export abstract class Filter {

    public readonly description;
    public readonly id;
    public readonly quantity?



    constructor(description : string, quantity? : number) {
        this.id = crypto.randomUUID()
        this.description = description
        this.quantity = quantity
    }



    public toString() {

        return `${this.id}: ${this.quantity} ${this.description}`

    }



    /* For content-level deep comparisons of Filters */
    public equals(obj: Object) {
        
        const filter = obj as Filter

        if(filter) {
            
            return filter.description === this.description && filter.quantity === this.quantity
        }

        return false

    }



    /* For id-level deep comparisons of Filters */
    public is(obj: Object) {
        
        const filter = obj as Filter

        if(filter) {
            return filter.id === this.id && filter.description === this.description && filter.quantity === this.quantity
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