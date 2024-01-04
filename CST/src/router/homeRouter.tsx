import { Route, Routes } from "react-router-dom"
import ViewSavedLists from "../pages/ViewSavedListsScreen"
import ResumeUpload from "../pages/ResumeUploadScreen"
import PageNotFoundScreen from "../pages/PageNotFoundScreen"

const HomeRoutes = () => {
    return (
        <>
            <Routes>
                <Route path="/resume-upload" element={<ResumeUpload />} />
                <Route path="/saved-lists" element={<ViewSavedLists />} />
                <Route path="/" element={<ResumeUpload />} />
                <Route path="/*" element={<PageNotFoundScreen />} />
            </Routes>
        </>
        
    )
}
export default HomeRoutes