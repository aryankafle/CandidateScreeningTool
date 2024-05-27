import { ReactNode, SetStateAction, createContext, useCallback, useReducer, useState } from "react"





type FlagTypes = 'enough resumes' |
                 'batch name set' |
                 'filters have changed' |
                 'user is logged in' |
                 'text scans have been created' |
                 'text scans have been requested' |
                 'uploads have been processed' | 
                 'batch results created'

type ActionTypes = {

    flag : FlagTypes

    action: 'toggle' | 'activate' | 'deactivate'

}

type FlagState = {

    active : FlagTypes[]

}





const FlagContextInitial = {

    loadingState : false,
    setLoadingState : {} as React.Dispatch<SetStateAction<boolean>>,
    clearFlags : {} as () => void,
    flags : { active: [] } as FlagState,
    updateFlag : (value : ActionTypes) => {}

}

type FlagContextType = typeof FlagContextInitial





const FlagContext = createContext<FlagContextType>(FlagContextInitial)

export default FlagContext



export const FlagContextProvider = (props: { children : ReactNode }) => {

    const [ loadingState, setLoadingState ] = useState<boolean>(FlagContextInitial.loadingState)



    const [ flags, updateFlag ] = useReducer( (currentFlagState: FlagState, action: ActionTypes) => {

        const copyOfState = {...currentFlagState};

        const flagIndex = currentFlagState.active.indexOf(action.flag)


        switch(action.action) {
            
            case 'toggle':
                
                if(flagIndex > -1) {

                    copyOfState.active.splice(flagIndex, 1)
        
                    return copyOfState
        
                }

                copyOfState.active.push(action.flag)

                return copyOfState;
            
            case 'activate':

                if(flagIndex < 0) {

                    copyOfState.active.push(action.flag)

                    return copyOfState;

                }

                return copyOfState;

            case 'deactivate':

                if(flagIndex > -1) {

                    copyOfState.active.splice(flagIndex, 1)
        
                    return copyOfState

                }

                return copyOfState;

        }

    }, { active: [] } )



    const clearFlags = useCallback(() => {

        flags.active.forEach(flag => {
           
            updateFlag({flag, action: "deactivate"})

        });

    }, [flags.active, updateFlag])





    return (
        <FlagContext.Provider

            value={{

                clearFlags,
                
                loadingState, setLoadingState,
                flags, updateFlag,

            }}

        >
            
            {props.children}
        
        </FlagContext.Provider>
    )

}