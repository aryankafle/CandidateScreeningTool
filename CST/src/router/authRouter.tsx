import { Route, Routes } from "react-router-dom"
import ResultsScreen from "../pages/ResultsScreen"
const authRoutes = () => {

    return (
        <>
            <Routes>
                <Route element={<ResultsScreen />}>
            </Routes>
        </>
    )
}

export default authRoutes