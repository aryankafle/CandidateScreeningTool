import { ReactNode, SetStateAction, createContext, useContext, useEffect, useMemo, useState } from "react"

import { postUserLocation } from "../requests/ResumeRequests"

import FlagContext from "./FlagContext"





const UserContextInitial = {

    userData : null as any | null,
    isLoggedIn : false,
    setUserData : {} as React.Dispatch<any>,
    location : "/home",
    setLocation : {} as React.Dispatch<SetStateAction<string>>

} 

type UserContextType = typeof UserContextInitial





const UserContext = createContext<UserContextType>(UserContextInitial)

export default UserContext



export const UserContextProvider = (props: { children : ReactNode }) => {

    const [ userData, setUserData ] = useState(UserContextInitial.userData)

    const [ location, setLocation ] = useState(UserContextInitial.location)

    const { updateFlag } = useContext(FlagContext)
    


    const isLoggedIn = useMemo(() => {
        
        return !!userData

    }, [userData])





    useEffect(() => {

        if(!userData) return;

        postUserLocation(userData.id, location)
    
    }, [location, userData])



    useEffect(() => {

        if(!userData) {

            updateFlag({flag: 'user is logged in', action: 'deactivate'})

        }

        updateFlag({flag: 'user is logged in', action: 'activate'})

    }, [updateFlag, userData])




    
    return (
        <UserContext.Provider

            value={{

                userData, setUserData, isLoggedIn, location, setLocation
                
            }}

        >

            {props.children}
        
        </UserContext.Provider>
    )

}