import { ReactNode, createContext, useState } from "react"





type FileContextType = {

    uploadedFiles: File[]
    setUploadedFiles: React.Dispatch<React.SetStateAction<File[]>>

}

const FileContextInitial = {

    uploadedFiles: [] as File[],
    setUploadedFiles: {} as React.Dispatch<React.SetStateAction<File[]>>,

}





export const FileContext = createContext<FileContextType>(FileContextInitial)

const FileContextProvider = (props: { children : ReactNode }) => {

    const [uploadedFiles, setUploadedFiles] = useState([] as File[])
    
    return (
        <FileContext.Provider value={{uploadedFiles, setUploadedFiles}}>
            {props.children}
        </FileContext.Provider>
    )

}

export default FileContextProvider