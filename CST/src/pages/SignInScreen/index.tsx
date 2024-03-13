import { useContext, useEffect } from "react"
import { UserContext } from "../../context/UserContext"
import { useNavigate } from 'react-router-dom';





const handleLogin = () => {
    window.open(
        `${process.env.REACT_APP_SERVER_NAME}/auth/google/callback`,
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
        <div className="bg-gradient-to-t from-blueDark to-black justify-center
                        flex flex-col flex-grow">
            <div className = "m-auto">       
                <button onClick = {handleLogin} className = "hover:animate-text hover:bg-gradient-to-r hover:from-blueDark hover:to-blueLight hover:bg-clip-text hover:text-transparent m-auto sm:h-[10rem] text-3xl bg-gradient-to-r from-grayLight to-white text-transparent bg-clip-text">
                         Sign In 
                </button>

            </div>
        </div>
        
    )
}

export default LoginScreen