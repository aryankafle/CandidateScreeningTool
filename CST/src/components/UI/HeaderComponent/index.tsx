import { useContext } from "react"
import { Link } from "react-router-dom"
import { UserContext } from "../../../context/UserContext"

const HeaderComponent = () => {

    const { userData, isLoggedIn } = useContext(UserContext)

    return (
        <header className="bg-white text-black
                           dark:text-white dark:bg-black
                           p-[0.7rem] select-none flex flex-shrink " 
        >
            { isLoggedIn ?
            <div
                className="flex flex-row min-w-[15rem] w-[20%] justify-between"
            >
                <text>
                    Welcome, {userData.displayName}.
                </text>
                <div>
                    <Link to="/signout">
                        Sign Out
                    </Link>
                </div>
            </div>
            :
            <Link to="/signin">
                Log In
            </Link>
            }
        </header>
    )
}

export default HeaderComponent