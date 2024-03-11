import { useContext, useEffect } from "react"
import { UserContext } from "../../context/UserContext"
import { Navigate, useNavigate } from 'react-router-dom';





const handleLogout = () => {
    window.open(
        `${process.env.REACT_APP_SERVER_HOST}:${process.env.REACT_APP_SERVER_PORT}/auth/logout`,
        "_self"
    )
}



const LogoutScreen = () => {
    
    const navigate = useNavigate()

    const { isLoggedIn } = useContext(UserContext)

    useEffect(() => {
        
        if(isLoggedIn) return;

        navigate("/auth/signin")

    }, [isLoggedIn, navigate])

    return (
        <div>
            <button
                onClick = {handleLogout}>
                    Sign Out
            </button>
        </div>
        
    )
}

export default LogoutScreen