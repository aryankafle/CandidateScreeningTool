import { useContext } from "react"
import { UserContext } from "../../context/UserContext"
import { Navigate } from 'react-router-dom';





const handleLogin = () => {
    window.open(
        `${process.env.REACT_APP_SERVER_HOST}:${process.env.REACT_APP_SERVER_PORT}/auth/google/callback`,
        "_self"
    )
}



const LoginScreen = () => {
    
    const { isLoggedIn } = useContext(UserContext)

    return (
        <div>
            {isLoggedIn && <Navigate to="/auth/home"/>}
            <button
                onClick = {handleLogin}>
                    Sign In          
            </button>
        </div>
        
    )
}

export default LoginScreen