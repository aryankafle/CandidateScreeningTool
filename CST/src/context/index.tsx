import { ReactNode, createContext } from "react"
import FileContextProvider from "./FileContext"
import FilterContextProvider from "./FilterContext"





type AppContextType = { }

export const AppContext = createContext<AppContextType>({ })






const AppContextProvider = (props: { children : ReactNode }) => {
    
    return (
        <AppContext.Provider value={{ }}>
            <FileContextProvider> 
                <FilterContextProvider>
                    {props.children}
                </FilterContextProvider>
            </FileContextProvider>
        </AppContext.Provider>
    )

}

export default AppContextProvider