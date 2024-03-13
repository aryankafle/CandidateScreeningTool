import { useContext } from "react"
import { Link } from "react-router-dom"
import { UserContext } from "../../../context/UserContext"

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
                    <Link to="/auth/signout" className="hover:text-grayMid">
                        Sign Out
                    </Link>
                </div>
            </div>
            :
            <Link to="/auth/signin" className="hover:text-grayMid">
                Log In
            </Link>
            }
            <Link to="/home" className="hover:text-grayMid">
                Home
            </Link>
        </header>
    )
}

export default HeaderComponent