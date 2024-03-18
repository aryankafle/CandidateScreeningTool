import { ReactNode, SetStateAction, createContext, useEffect, useState, useContext } from "react"
import { Filter } from "../utils/Filter"
import { SavedList } from "../utils/SavedList"

import { postUserCurrentSavedList } from "../requests/ResumeRequests"
import { FlagContext } from "./FlagContext"
import { UserContext } from "./UserContext"








type SelectionContextType = {

    previouslySelectedFilters : Filter[]
    setPreviouslySelectedFilters : React.Dispatch<SetStateAction<Filter[]>>

    uploadedFiles: File[]
    setUploadedFiles: React.Dispatch<React.SetStateAction<File[]>>
    currentBatchName: string
    setCurrentBatchName: React.Dispatch<React.SetStateAction<string>>
    currentBatchId : string
    setCurrentBatchId : React.Dispatch<React.SetStateAction<string>>
    currentFormData : FormData
    setCurrentFormData : React.Dispatch<React.SetStateAction<FormData>>

    selectedFilters: Filter[]
    setSelectedFilters: React.Dispatch<React.SetStateAction<Filter[]>>

    currentSavedList : SavedList,
    setCurrentSavedList : React.Dispatch<SetStateAction<SavedList>>
    
    previouslySavedFiles : File[]
    setPreviouslySavedFiles : React.Dispatch<SetStateAction<File[]>>

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
    currentFormData : {} as FormData,
    setCurrentFormData : {} as React.Dispatch<React.SetStateAction<FormData>>,

    selectedFilters: [] as Filter[],
    setSelectedFilters: {} as React.Dispatch<React.SetStateAction<Filter[]>>,

    currentSavedList : {} as SavedList,
    setCurrentSavedList : {} as React.Dispatch<SetStateAction<SavedList>>,

    previouslySavedFiles : [],
    setPreviouslySavedFiles : {} as React.Dispatch<SetStateAction<File[]>>,

}





export const SelectionContext = createContext<SelectionContextType>(SelectionContextInitial)

const SelectionContextProvider = (props: { children : ReactNode }) => {

    const { flags } = useContext(FlagContext)
    const { userData } = useContext(UserContext)
    


    const [uploadedFiles, setUploadedFiles] = useState([] as File[])
    const [currentBatchName, setCurrentBatchName] = useState("")
    const [currentBatchId, setCurrentBatchId] = useState("crypto.randomUUID() as string")
    const [currentFormData, setCurrentFormData] = useState<FormData>({} as FormData)

    const [selectedFilters, setSelectedFilters] = useState([] as Filter[])
    const [previouslySelectedFilters, setPreviouslySelectedFilters] = useState<Filter[]>([])

    const [currentSavedList, setCurrentSavedList] = useState<SavedList>({} as SavedList)

    const [previouslySavedFiles, setPreviouslySavedFiles] = useState([] as File[])





    useEffect(() => {

        if(!userData) return;

        postUserCurrentSavedList(userData.id, currentSavedList)
    
    }, [currentSavedList, flags.active, userData])
    




    return (
        <SelectionContext.Provider value={{
                
                uploadedFiles, setUploadedFiles,
                currentBatchName, setCurrentBatchName,
                currentBatchId, setCurrentBatchId,
                currentFormData, setCurrentFormData,

                selectedFilters, setSelectedFilters,
                previouslySelectedFilters, setPreviouslySelectedFilters,

                currentSavedList, setCurrentSavedList, 

                previouslySavedFiles, setPreviouslySavedFiles,
                
            }}>
            {props.children}
        </SelectionContext.Provider>
    )

}

export default SelectionContextProvider