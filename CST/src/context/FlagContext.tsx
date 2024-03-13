import { ReactNode, SetStateAction, createContext, useState } from "react"








type FlagContextType = {

    loadingState : boolean,
    setLoadingState : React.Dispatch<SetStateAction<boolean>>
    filtersChanged : boolean,
    setFiltersChanged : React.Dispatch<SetStateAction<boolean>>

}

const FlagContextInitial = {

    loadingState : false,
    setLoadingState : {} as React.Dispatch<SetStateAction<boolean>>,
    filtersChanged : true,
    setFiltersChanged : {} as React.Dispatch<SetStateAction<boolean>>

}





export const FlagContext = createContext<FlagContextType>(FlagContextInitial)

const FlagContextProvider = (props: { children : ReactNode }) => {

    const [ loadingState, setLoadingState ] = useState<boolean>(false)

    const [ filtersChanged, setFiltersChanged ] = useState<boolean>(true)



    return (
        <FlagContext.Provider value={{
                loadingState, setLoadingState,
                filtersChanged, setFiltersChanged
            }}>
            {props.children}
        </FlagContext.Provider>
    )

}

export default FlagContextProvider