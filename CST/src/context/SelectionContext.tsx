import { ReactNode, SetStateAction, createContext, useEffect, useState, useContext } from "react"
import { Filter } from "../utils/Filter"
import { SavedList } from "../utils/SavedList"

import { postUserCurrentSavedList } from "../requests/ResumeRequests"
import { FlagContext } from "./FlagContext"
import { UserContext } from "./UserContext"
import { Result } from "../utils/Result"








type SelectionContextType = {

    previouslySelectedFilters : Filter[]
    setPreviouslySelectedFilters : React.Dispatch<SetStateAction<Filter[]>>

    uploadedFiles: File[]
    setUploadedFiles: React.Dispatch<React.SetStateAction<File[]>>

    batchResults : Result[] | undefined
    setBatchResults : React.Dispatch<React.SetStateAction<Result[] | undefined>>

    currentBatchName: string
    setCurrentBatchName: React.Dispatch<React.SetStateAction<string>>
    currentBatchId : string
    setCurrentBatchId : React.Dispatch<React.SetStateAction<string>>
    currentBatchFileIds : string[]
    setCurrentBatchFileIds : React.Dispatch<React.SetStateAction<string[]>>

    selectedFilters: Filter[]
    setSelectedFilters: React.Dispatch<React.SetStateAction<Filter[]>>

    currentSavedList : SavedList | undefined,
    setCurrentSavedList : React.Dispatch<SetStateAction<SavedList | undefined>>

}

const SelectionContextInitial = {

    previouslySelectedFilters : [] as Filter[],
    setPreviouslySelectedFilters : {} as React.Dispatch<SetStateAction<Filter[]>>,

    uploadedFiles: [] as File[],
    setUploadedFiles: {} as React.Dispatch<React.SetStateAction<File[]>>,

    currentBatchName: "",
    setCurrentBatchName: {} as React.Dispatch<React.SetStateAction<string>>,
    currentBatchId: crypto.randomUUID() as string,
    setCurrentBatchId: {} as React.Dispatch<React.SetStateAction<string>>,
    currentBatchFileIds: [] as string[],
    setCurrentBatchFileIds: {} as React.Dispatch<React.SetStateAction<string[]>>,

    selectedFilters: [] as Filter[],
    setSelectedFilters: {} as React.Dispatch<React.SetStateAction<Filter[]>>,

    batchResults : [] as Result[] | undefined,
    setBatchResults : {} as React.Dispatch<React.SetStateAction<Result[] | undefined>>,

    currentSavedList : {} as SavedList | undefined,
    setCurrentSavedList : {} as React.Dispatch<SetStateAction<SavedList>> | undefined,

}





export const SelectionContext = createContext<SelectionContextType>(SelectionContextInitial)

const SelectionContextProvider = (props: { children : ReactNode }) => {

    const { flags } = useContext(FlagContext)
    const { userData } = useContext(UserContext)
    


    const [uploadedFiles, setUploadedFiles] = useState([] as File[])

    const [currentBatchName, setCurrentBatchName] = useState("")
    const [currentBatchId, setCurrentBatchId] = useState(crypto.randomUUID() as string)
    const [currentBatchFileIds, setCurrentBatchFileIds] = useState([] as string[])

    const [selectedFilters, setSelectedFilters] = useState([] as Filter[])
    const [previouslySelectedFilters, setPreviouslySelectedFilters] = useState<Filter[]>([])

    const [batchResults, setBatchResults] = useState([] as Result[])

    const [currentSavedList, setCurrentSavedList] = useState<SavedList>({} as SavedList)





    useEffect(() => {

        if(!userData) return;

        postUserCurrentSavedList(userData.id, currentSavedList)
    
    }, [currentSavedList, flags.active, userData])
    




    return (
        <SelectionContext.Provider value={{
                
                uploadedFiles, setUploadedFiles,

                currentBatchName, setCurrentBatchName,
                currentBatchId, setCurrentBatchId,
                currentBatchFileIds, setCurrentBatchFileIds,

                selectedFilters, setSelectedFilters,
                previouslySelectedFilters, setPreviouslySelectedFilters,
                
                batchResults, setBatchResults,

                currentSavedList, setCurrentSavedList, 
                
            }}>
            {props.children}
        </SelectionContext.Provider>
    )

}

export default SelectionContextProvider