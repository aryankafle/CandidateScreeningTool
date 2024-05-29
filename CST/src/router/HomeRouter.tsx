import { Route, Routes } from "react-router-dom"
import PageNotFoundScreen from "../pages/PageNotFoundScreen"
import ResultsScreen from "../pages/ResultsScreen"
import ResumeUpload from "../pages/ResumeUploadScreen"
import ViewSavedLists from "../pages/ViewSavedListsScreen"






const HomeRoutes = () => {

    return (
        <Routes>
            <Route path="/resume-upload" element={<ResumeUpload />} />
            <Route path="/saved-lists" element={<ViewSavedLists />} />
            <Route path="/results" element={<ResultsScreen />} />
            <Route path="/" element={<ResumeUpload />} />
            <Route path="/*" element={<PageNotFoundScreen />} />
        </Routes>
        
    )
}

export default HomeRoutes