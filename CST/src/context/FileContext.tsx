import { ReactNode, createContext, useState } from "react"





type FileContextType = {

    uploadedFiles: File[]
    setUploadedFiles: React.Dispatch<React.SetStateAction<File[]>>
    currentBatchName: string
    setCurrentBatchName: React.Dispatch<React.SetStateAction<string>>

}

const FileContextInitial = {

    uploadedFiles: [] as File[],
    setUploadedFiles: {} as React.Dispatch<React.SetStateAction<File[]>>,
    currentBatchName: "",
    setCurrentBatchName: {} as React.Dispatch<React.SetStateAction<string>>

}





export const FileContext = createContext<FileContextType>(FileContextInitial)

const FileContextProvider = (props: { children : ReactNode }) => {

    const [uploadedFiles, setUploadedFiles] = useState([] as File[])
    const [currentBatchName, setCurrentBatchName] = useState("")
    
    return (
        <FileContext.Provider value={{uploadedFiles, setUploadedFiles, currentBatchName, setCurrentBatchName}}>
            {props.children}
        </FileContext.Provider>
    )

}

export default FileContextProvider