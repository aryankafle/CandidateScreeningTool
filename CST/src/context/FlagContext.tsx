import { ReactNode, SetStateAction, createContext, useState } from "react"








type FlagContextType = {

    filtersChanged : boolean,
    setFiltersChanged : React.Dispatch<SetStateAction<boolean>>,
    loadingState : boolean,
    setLoadingState : React.Dispatch<SetStateAction<boolean>>

}

const FlagContextInitial = {

    filtersChanged : false,
    setFiltersChanged : {} as React.Dispatch<SetStateAction<boolean>>,
    loadingState : false,
    setLoadingState : {} as React.Dispatch<SetStateAction<boolean>>

}





export const FlagContext = createContext<FlagContextType>(FlagContextInitial)

const FlagContextProvider = (props: { children : ReactNode }) => {

    const [ filtersChanged, setFiltersChanged ] = useState<boolean>(false)
    const [ loadingState, setLoadingState ] = useState<boolean>(false)



    return (
        <FlagContext.Provider value={{
                filtersChanged, setFiltersChanged, loadingState, setLoadingState
            }}>
            {props.children}
        </FlagContext.Provider>
    )

}

export default FlagContextProvider