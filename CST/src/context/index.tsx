import { ReactNode, createContext } from "react"
import { BatchContextProvider } from "./BatchContext"
import { FlagContextProvider } from "./FlagContext"
import { SavedListsContextProvider } from "./SavedListsContext"
import { SelectionContextProvider } from "./SelectionContext"
import { UserContextProvider } from "./UserContext"





type AppContextType = { }

export const AppContext = createContext<AppContextType>({ })






const AppContextProvider = (props: { children : ReactNode }) => {
    
    return (
        <AppContext.Provider value={{ }}>
            <UserContextProvider>
                <SavedListsContextProvider>
                    <SelectionContextProvider>
                        <FlagContextProvider>
                            <BatchContextProvider>
                                {props.children}
                            </BatchContextProvider>
                        </FlagContextProvider>
                    </SelectionContextProvider>
                </SavedListsContextProvider>
            </UserContextProvider>
        </AppContext.Provider>
    )
}

export default AppContextProvider