import { ReactNode, SetStateAction, createContext, useContext, useEffect, useMemo, useState } from "react"
import { postUserLocation } from "../requests/ResumeRequests"
import { FlagContext } from "./FlagContext"





type UserContextType = {

    userData : any
    isLoggedIn : boolean
    setUserData : React.Dispatch<any>,
    location : string ,
    setLocation : React.Dispatch<SetStateAction<string>>

}

const UserContextInitial = {

    userData: null,
    isLoggedIn: false,
    setUserData: {} as React.Dispatch<any>,
    location : "",
    setLocation : {} as React.Dispatch<SetStateAction<string>>

}





export const UserContext = createContext<UserContextType>(UserContextInitial)

const UserContextProvider = (props: { children : ReactNode }) => {

    const [ userData, setUserData ] = useState<any>(null)

    const [ location, setLocation ] = useState<string>("")

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
        <UserContext.Provider value={{ userData, setUserData, isLoggedIn, location, setLocation }}>
            {props.children}
        </UserContext.Provider>
    )

}

export default UserContextProvider