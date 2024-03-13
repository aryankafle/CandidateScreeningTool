import { useContext, useEffect } from "react"
import { UserContext } from "../../context/UserContext"
import { useNavigate } from 'react-router-dom';





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
        <div className="bg-gradient-to-t from-blueDark to-black justify-center
                        flex flex-col flex-grow">
            <div className = "m-auto">       
                <button onClick = {handleLogout} className = "hover:animate-text hover:bg-gradient-to-r hover:from-blueDark hover:to-grayLight hover:bg-clip-text hover:text-transparent m-auto sm:h-[10rem] text-3xl bg-gradient-to-r from-darkerWhite to-white text-transparent bg-clip-text">
                         Sign Out
                </button>

            </div>
        </div>
        
    )
}

export default LogoutScreen