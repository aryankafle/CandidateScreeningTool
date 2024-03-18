import { ReactNode, SetStateAction, createContext, useReducer, useState } from "react"





type FlagTypes = 'enough resumes' |
                 'batch name set' |
                 'filters have changed' |
                 'initial location navigated' |
                 'user is logged in'

type ActionTypes = {

    flag : FlagTypes

    action: 'toggle' | 'activate' | 'deactivate'

}

type FlagState = {

    active : FlagTypes[]

}





type FlagContextType = {

    loadingState : boolean,
    setLoadingState : React.Dispatch<SetStateAction<boolean>>,
    flags : FlagState,
    updateFlag : React.Dispatch<ActionTypes>

}

const FlagContextInitial = {

    loadingState : false,
    setLoadingState : {} as React.Dispatch<SetStateAction<boolean>>,
    flags : { active: [] } as FlagState,
    updateFlag : (value : ActionTypes) => {}

}





export const FlagContext = createContext<FlagContextType>(FlagContextInitial)

const FlagContextProvider = (props: { children : ReactNode }) => {

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

                    console.log("eayhahsdhf,", currentFlagState)

                    copyOfState.active.splice(flagIndex, 1)

                    console.log("eayhahsdhf,", copyOfState)
        
                    return copyOfState

                }

                return copyOfState;

        }

    }, { active: [] } )





    return (
        <FlagContext.Provider value={{
                loadingState, setLoadingState,
                flags, updateFlag,
            }}>
            {props.children}
        </FlagContext.Provider>
    )

}

export default FlagContextProvider