import { ReactNode, createContext } from "react"
import { SavedListsContextProvider } from "./SavedListsContext"
import { UserContextProvider } from "./UserContext"
import { SelectionContextProvider } from "./SelectionContext"
import { FlagContextProvider } from "./FlagContext"
import { BatchContextProvider } from "./BatchContext"





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