import { ReactNode, createContext } from "react"
import FileContextProvider from "./FileContext"
import FilterContextProvider from "./FilterContext"
import SavedListsContextProvider from "./SavedListsContext"
import UserContextProvider from "./UserContext"
import SelectionContextProvider from "./SelectionContext"





type AppContextType = { }

export const AppContext = createContext<AppContextType>({ })






const AppContextProvider = (props: { children : ReactNode }) => {
    
    return (
        <AppContext.Provider value={{ }}>
            <UserContextProvider>
                <FileContextProvider> 
                    <FilterContextProvider>
                        <SavedListsContextProvider>
                            <SelectionContextProvider>
                                {props.children}
                            </SelectionContextProvider>
                        </SavedListsContextProvider>
                    </FilterContextProvider>
                </FileContextProvider>
            </UserContextProvider>
        </AppContext.Provider>
    )
}

export default AppContextProvider