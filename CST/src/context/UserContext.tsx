import { ReactNode, createContext, useContext, useEffect, useMemo, useState } from "react"

import FlagContext from "./FlagContext"





const UserContextInitial = {

    userData : null as any | null,
    isLoggedIn : false,
    setUserData : {} as React.Dispatch<any>,

} 

type UserContextType = typeof UserContextInitial





const UserContext = createContext<UserContextType>(UserContextInitial)

export default UserContext



export const UserContextProvider = (props: { children : ReactNode }) => {

    const [ userData, setUserData ] = useState(UserContextInitial.userData)

    const { updateFlag } = useContext(FlagContext)
    


    const isLoggedIn = useMemo(() => {
        
        return !!userData

    }, [userData])



    useEffect(() => {

        if(!userData) {

            updateFlag({flag: 'user is logged in', action: 'deactivate'})

        }

        updateFlag({flag: 'user is logged in', action: 'activate'})

    }, [updateFlag, userData])




    
    return (
        <UserContext.Provider

            value={{

                userData, setUserData, isLoggedIn
                
            }}

        >

            {props.children}
        
        </UserContext.Provider>
    )

}