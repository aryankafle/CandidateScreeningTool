import { Callback } from "mongodb"
import { ReactNode, createContext, useState } from "react"





type AppContextType = { }

export const AppContext = createContext<AppContextType>({ })



type FileContextType = {
    uploadedFiles: string[]
    setUploadedFiles: React.Dispatch<React.SetStateAction<string[]>> | Callback
}

const FileContextInitialValues = {
    uploadedFiles: [],
    setUploadedFiles: () => {}
}

export const FileContext = createContext<FileContextType | undefined>({ })





const AppContextProvider = (props: { children : ReactNode }) => {

    const [uploadedFiles, setUploadedFiles] = useState<string[]>([])
    
    



    return (
        <AppContext.Provider value={{ }}>
            <FileContext.Provider value={{uploadedFiles, setUploadedFiles}}>
                {props.children}
            </FileContext.Provider>
        </AppContext.Provider>
    )

}

export default AppContextProvider