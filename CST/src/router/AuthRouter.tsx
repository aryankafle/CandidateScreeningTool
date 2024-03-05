import { Route, Routes } from "react-router-dom"
import SignInScreen from "../pages/SignInScreen"
import SignOutScreen from "../pages/SignOutScreen"

const AuthRoutes = () => {

    return (
        <Routes>
            <Route path="/signin" element={<SignInScreen />} />
            <Route path="/signout" element={<SignOutScreen />} />
        </Routes>
    )
}

export default AuthRoutes