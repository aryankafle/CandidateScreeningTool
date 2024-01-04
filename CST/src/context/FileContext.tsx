import { ReactNode, createContext, useState } from "react"





type FileContextType = {
    uploadedFiles: string[]
    chosenFiles: string[]
    setUploadedFiles: React.Dispatch<React.SetStateAction<string[]>>
    setChosenFiles: React.Dispatch<React.SetStateAction<string[]>>
}

const FileContextInitial = {
    uploadedFiles: [] as string[],
    chosenFiles: [] as string[],
    setUploadedFiles: {} as React.Dispatch<React.SetStateAction<string[]>>,
    setChosenFiles: {} as React.Dispatch<React.SetStateAction<string[]>>
}





export const FileContext = createContext<FileContextType>(FileContextInitial)

const FileContextProvider = (props: { children : ReactNode }) => {

    const [uploadedFiles, setUploadedFiles] = useState([] as string[])
    const [chosenFiles, setChosenFiles] = useState([] as string[])
    
    return (
        <FileContext.Provider value={{uploadedFiles, chosenFiles, setUploadedFiles, setChosenFiles}}>
            {props.children}
        </FileContext.Provider>
    )

}

export default FileContextProvider