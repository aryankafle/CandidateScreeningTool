import { ReactNode, createContext } from "react"
import FileContextProvider from "./FileContext"
import FilterContextProvider from "./FilterContext"
import SavedListsContextProvider from "./SavedListsContext"
import AuthContextProvider from "./AuthContext"





type AppContextType = { }

export const AppContext = createContext<AppContextType>({ })






const AppContextProvider = (props: { children : ReactNode }) => {
    
    return (
        <AppContext.Provider value={{ }}>
            <AuthContextProvider>
                <FileContextProvider> 
                    <FilterContextProvider>
                        <SavedListsContextProvider>
                            {props.children}
                        </SavedListsContextProvider>
                    </FilterContextProvider>
                </FileContextProvider>
            </AuthContextProvider>
        </AppContext.Provider>
    )
}

export default AppContextProvider