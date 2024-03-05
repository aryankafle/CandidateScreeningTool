import { ReactNode, createContext } from "react"
import FileContextProvider from "./FileContext"
import FilterContextProvider from "./FilterContext"
import SavedListsContextProvider from "./SavedListsContext"





type AppContextType = { }

export const AppContext = createContext<AppContextType>({ })






const AppContextProvider = (props: { children : ReactNode }) => {
    
    return (
        <AppContext.Provider value={{ }}>
            <FileContextProvider> 
                <FilterContextProvider>
                    <SavedListsContextProvider>
                        {props.children}
                    </SavedListsContextProvider>
                </FilterContextProvider>
            </FileContextProvider>
        </AppContext.Provider>
    )
}

export default AppContextProvider