import { ReactNode, createContext, useState } from "react"





type AppContextType = { }

export const AppContext = createContext<AppContextType>({ })



type FileContextType = {
    uploadedFiles: string[]
    setUploadedFiles: React.Dispatch<React.SetStateAction<string[]>>
}

const FileContextInitial = {
    uploadedFiles: [] as string[],
    setUploadedFiles: {} as React.Dispatch<React.SetStateAction<string[]>>
}

export const FileContext = createContext<FileContextType>(FileContextInitial)





const AppContextProvider = (props: { children : ReactNode }) => {

    const [uploadedFiles, setUploadedFiles] = useState([] as string[])
    
    



    return (
        <AppContext.Provider value={{ }}>
            <FileContext.Provider value={{uploadedFiles, setUploadedFiles}}>
                {props.children}
            </FileContext.Provider>
        </AppContext.Provider>
    )

}

export default AppContextProvider