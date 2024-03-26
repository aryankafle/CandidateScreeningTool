import { useContext, useEffect } from "react"
import { Link } from "react-router-dom"
import { UserContext } from "../../../context/UserContext"
import { useNavigate } from 'react-router-dom';





const handleLogin = () => {
    window.open(
        `${process.env.REACT_APP_SERVER_NAME}/auth/google/callback`,
        "_self"
    )
}

const handleLogout = () => {
    window.open(
        `${process.env.REACT_APP_SERVER_NAME}/auth/logout`,
        "_self"
    )
}



const HeaderComponent = () => {

    const { userData, isLoggedIn } = useContext(UserContext)
    
    return (
        <header className="bg-white text-black
                           dark:text-white dark:bg-black
                           p-[0.7rem] select-none flex flex-shrink flex-row justify-between px-[2rem]" 
        >
            { isLoggedIn ?
            <div
                className="flex flex-row min-w-[15rem] w-[20%] justify-between"
            >
                <span>
                    Welcome, {userData.displayName}.
                </span>
                <div>
                    <button onClick = {handleLogout} className="hover:text-grayMid">
                        Sign Out
                    </button>
                </div>
            </div>
            :
            <button onClick = {handleLogin} className="hover:text-grayMid">
                Sign In
            </button>
            
            }
            { isLoggedIn ? 
            <Link to="/home" className="hover:text-grayMid">
                Home
            </Link>
            : 
            <div> </div>
            }
            {/* nate needs to fix this lmao */}
        </header>
    )
}

export default HeaderComponent