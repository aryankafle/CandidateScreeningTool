import { useContext, useEffect } from "react"
import { UserContext } from "../../context/UserContext"
import { useNavigate } from 'react-router-dom';





const handleLogin = () => {
    window.open(
        `${process.env.REACT_APP_SERVER_HOST}:${process.env.REACT_APP_SERVER_PORT}/auth/google/callback`,
        "_self"
    )
}







const LoginScreen = () => {
    
    const navigate = useNavigate()

    const { isLoggedIn } = useContext(UserContext)

    useEffect(() => {
        
        if(!isLoggedIn) return;

        navigate("/home")

    }, [isLoggedIn, navigate])


    return (
        <div className="text-center text-2xl">
            <button
                onClick = {handleLogin} className="text-black hover:text-grayMid border-2 border-spacing-8 
                                                    rounded m-4 p-1">
                    Sign In       
            </button>
        </div>
        
    )
}

export default LoginScreen