import { Route, Routes } from "react-router-dom"
import ViewSavedLists from "../pages/ViewSavedListsScreen"
import ResumeUpload from "../pages/ResumeUploadScreen"

import HomeNavBar from "../components/HomeNavBar"
import PageNotFoundPopup from "../pages/PageNotFoundScreen"

const HomeRoutes = () => {
    return (
        <>
            <HomeNavBar resumeUploadRoute={"/home/resume-upload"} savedListsRoute={"/home/saved-lists"}/>
            <Routes>
                <Route path="/resume-upload" element={<ResumeUpload />} />
                <Route path="/saved-lists" element={<ViewSavedLists />} />
                <Route path="/*" element={<PageNotFoundPopup />} />
            </Routes>
        </>
        
    )
}
export default HomeRoutes