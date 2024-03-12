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
        <div className="text-center text-3xl">
            <button
                onClick = {handleLogout} className="text-center 
                hover:animate-text hover:bg-gradient-to-r hover:from-blueDark hover:to-grayLight hover:bg-clip-text hover:text-transparent
                rounded m-4 p-1 animate-text bg-gradient-to-r from-blueDark to-blueLight bg-clip-text text-transparent">
                    Sign Out
            </button>
        </div>
        
    )
}

export default LogoutScreen