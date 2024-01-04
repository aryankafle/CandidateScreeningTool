import { ReactNode, createContext, useState } from "react"
import FileContext from "./FileContext"





type AppContextType = { }

export const AppContext = createContext<AppContextType>({ })






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