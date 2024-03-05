import { ReactNode, createContext, useMemo, useState } from "react"





type UserContextType = {

    userData : any
    isLoggedIn : boolean
    setUserData : React.Dispatch<any>

}

const UserContextInitial = {

    userData: null,
    isLoggedIn: false,
    setUserData: {} as React.Dispatch<any>

}





export const UserContext = createContext<UserContextType>(UserContextInitial)

const UserContextProvider = (props: { children : ReactNode }) => {

    const [userData, setUserData] = useState<any>(null)

    const isLoggedIn = useMemo(() => {
        return !!userData
    }, [userData])

    
    return (
        <UserContext.Provider value={{ userData, setUserData, isLoggedIn }}>
            {props.children}
        </UserContext.Provider>
    )

}

export default UserContextProvider