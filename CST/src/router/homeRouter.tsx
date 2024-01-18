import { Route, Routes } from "react-router-dom"
import ViewSavedLists from "../pages/ViewSavedListsScreen"
import LoginScreen from "../pages/LoginScreen"
import ResumeUpload from "../pages/ResumeUploadScreen"
import PageNotFoundScreen from "../pages/PageNotFoundScreen"
import ResultsScreen from "../pages/ResultsScreen"






const HomeRoutes = () => {
    return (
        <>
            <Routes>
                <Route path="/resume-upload" element={<ResumeUpload />} />
                <Route path="/saved-lists" element={<LoginScreen />} />
                <Route path="/results" element={<ResultsScreen />} />
                <Route path="/" element={<ResumeUpload />} />
                <Route path="/*" element={<PageNotFoundScreen />} />
            </Routes>
        </>
        
    )
}

export default HomeRoutes