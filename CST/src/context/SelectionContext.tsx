import { ReactNode, createContext, useState } from "react"

import { Filter } from "../utils/Filter"





const SelectionContextInitial = {

    uploadedFiles: [] as File[],
    setUploadedFiles: {} as React.Dispatch<React.SetStateAction<File[]>>,

    selectedFilters: [] as Filter[],
    setSelectedFilters: {} as React.Dispatch<React.SetStateAction<Filter[]>>,

    previouslySelectedFilters: [] as Filter[],
    setPreviouslySelectedFilters: {} as React.Dispatch<React.SetStateAction<Filter[]>>,

}

type SelectionContextType = typeof SelectionContextInitial






const SelectionContext = createContext<SelectionContextType>({} as SelectionContextType)

export default SelectionContext



export const SelectionContextProvider = (props: { children : ReactNode }) => {

    const [uploadedFiles, setUploadedFiles] = useState([] as File[])

    const [selectedFilters, setSelectedFilters] = useState([] as Filter[])
    
    const [previouslySelectedFilters, setPreviouslySelectedFilters] = useState<Filter[]>([])





    return (
        <SelectionContext.Provider

            value={{
                
                uploadedFiles, setUploadedFiles,

                selectedFilters, setSelectedFilters,

                previouslySelectedFilters, setPreviouslySelectedFilters,
                
            }}

        >

            {props.children}

        </SelectionContext.Provider>
    )

}