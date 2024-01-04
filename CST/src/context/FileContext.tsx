import { createContext } from "react"





type FileContextType = {
    uploadedFiles: string[]
    setUploadedFiles: React.Dispatch<React.SetStateAction<string[]>>
}

const FileContextInitial = {
    uploadedFiles: [] as string[],
    setUploadedFiles: {} as React.Dispatch<React.SetStateAction<string[]>>
}





const FileContext = createContext<FileContextType>(FileContextInitial)

export default FileContext