import { ReactNode, createContext, useState } from "react"





type FileContextType = {
    uploadedFiles: File[]
    chosenFiles: File[]
    setUploadedFiles: React.Dispatch<React.SetStateAction<File[]>>
    setChosenFiles: React.Dispatch<React.SetStateAction<File[]>>
}

const FileContextInitial = {
    uploadedFiles: [] as File[],
    chosenFiles: [] as File[],
    setUploadedFiles: {} as React.Dispatch<React.SetStateAction<File[]>>,
    setChosenFiles: {} as React.Dispatch<React.SetStateAction<File[]>>
}





export const FileContext = createContext<FileContextType>(FileContextInitial)

const FileContextProvider = (props: { children : ReactNode }) => {

    const [uploadedFiles, setUploadedFiles] = useState([] as File[])
    const [chosenFiles, setChosenFiles] = useState([] as File[])
    
    return (
        <FileContext.Provider value={{uploadedFiles, chosenFiles, setUploadedFiles, setChosenFiles}}>
            {props.children}
        </FileContext.Provider>
    )

}

export default FileContextProvider