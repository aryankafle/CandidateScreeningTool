import { ReactNode, createContext } from "react"
import FileContextProvider from "./FileContext"





type AppContextType = { }

export const AppContext = createContext<AppContextType>({ })






const AppContextProvider = (props: { children : ReactNode }) => {
    
    return (
        <AppContext.Provider value={{ }}>
            <FileContextProvider>
                {props.children}
            </FileContextProvider>
        </AppContext.Provider>
    )

}

export default AppContextProvider