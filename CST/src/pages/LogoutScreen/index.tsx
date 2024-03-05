import { useContext } from "react"
import { UserContext } from "../../context/UserContext"
import { Navigate } from 'react-router-dom';





const handleLogout = () => {
    window.open(
        `${process.env.REACT_APP_SERVER_HOST}:${process.env.REACT_APP_SERVER_PORT}/auth/logout`,
        "_self"
    )
}



const LogoutScreen = () => {
    
    const { isLoggedIn } = useContext(UserContext)

    return (
        <div>
            {!isLoggedIn && <Navigate to="/signin"/>}
            <button
                onClick = {handleLogout}>
                    Logout
            </button>
        </div>
        
    )
}

export default LogoutScreen