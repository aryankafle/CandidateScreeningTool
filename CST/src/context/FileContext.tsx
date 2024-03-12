import { ReactNode, createContext, useState } from "react"





type FileContextType = {

    uploadedFiles: File[]
    setUploadedFiles: React.Dispatch<React.SetStateAction<File[]>>
    currentBatchName: string
    setCurrentBatchName: React.Dispatch<React.SetStateAction<string>>
    currentBatchId : string
    setCurrentBatchId : React.Dispatch<React.SetStateAction<string>>
    currentFormData : FormData
    setCurrentFormData : React.Dispatch<React.SetStateAction<FormData>>

}

const FileContextInitial = {

    uploadedFiles: [] as File[],
    setUploadedFiles: {} as React.Dispatch<React.SetStateAction<File[]>>,
    currentBatchName: "",
    setCurrentBatchName: {} as React.Dispatch<React.SetStateAction<string>>,
    currentBatchId: "12345",
    //currentBatchId: crypto.randomUUID() as string,
    setCurrentBatchId: {} as React.Dispatch<React.SetStateAction<string>>,
    currentFormData : {} as FormData,
    setCurrentFormData : {} as React.Dispatch<React.SetStateAction<FormData>>

}





export const FileContext = createContext<FileContextType>(FileContextInitial)

const FileContextProvider = (props: { children : ReactNode }) => {

    const [uploadedFiles, setUploadedFiles] = useState([] as File[])
    const [currentBatchName, setCurrentBatchName] = useState("")
    const [currentBatchId, setCurrentBatchId] = useState("111")
    //crypto.randomUUID() as string
    const [currentFormData, setCurrentFormData] = useState<FormData>({} as FormData)
    
    return (
        <FileContext.Provider value={{uploadedFiles, setUploadedFiles, currentBatchName, setCurrentBatchName, currentBatchId, setCurrentBatchId, currentFormData, setCurrentFormData}}>
            {props.children}
        </FileContext.Provider>
    )

}

export default FileContextProvider