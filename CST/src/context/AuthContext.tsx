import { ReactNode, createContext, useState } from "react"





type AuthContextType = {



}

const AuthContextInitial = {



}





export const AuthContext = createContext<AuthContextType>(AuthContextInitial)

const AuthContextProvider = (props: { children : ReactNode }) => {

    
    
    return (
        <AuthContext.Provider value={{ }}>
            {props.children}
        </AuthContext.Provider>
    )

}

export default AuthContextProvider