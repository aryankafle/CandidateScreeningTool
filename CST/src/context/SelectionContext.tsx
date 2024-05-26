import { ReactNode, createContext, useCallback, useState } from "react"

import { Filter } from "../utils/Filter"





const SelectionContextInitial = {

    uploadedFiles: [] as File[],
    setUploadedFiles: {} as React.Dispatch<React.SetStateAction<File[]>>,

    selectedFilters: [] as Filter[],
    setSelectedFilters: {} as React.Dispatch<React.SetStateAction<Filter[]>>,

    clearSelectionContext : {} as () => void

}

type SelectionContextType = typeof SelectionContextInitial






const SelectionContext = createContext<SelectionContextType>({} as SelectionContextType)

export default SelectionContext



export const SelectionContextProvider = (props: { children : ReactNode }) => {

    const [uploadedFiles, setUploadedFiles] = useState([] as File[])

    const [selectedFilters, setSelectedFilters] = useState([] as Filter[])
    
    const clearSelectionContext = useCallback(() => {

        setUploadedFiles([])
        setSelectedFilters([])

    }, [setUploadedFiles, setSelectedFilters])





    return (
        <SelectionContext.Provider

            value={{
                
                uploadedFiles, setUploadedFiles,

                selectedFilters, setSelectedFilters,

                clearSelectionContext
                
            }}

        >

            {props.children}

        </SelectionContext.Provider>
    )

}