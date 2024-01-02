import { Route, Routes } from "react-router-dom"
import ViewSavedLists from "../pages/ViewSavedListsScreen"
import ResumeUpload from "../pages/ResumeUploadScreen"

import PageNotFoundPopup from "../pages/PageNotFoundScreen"

const HomeRoutes = () => {
    return (
        <>
            <Routes>
                <Route path="/resume-upload" element={<ResumeUpload />} />
                <Route path="/saved-lists" element={<ViewSavedLists />} />
                <Route path="/*" element={<ResumeUpload />} />
            </Routes>
        </>
        
    )
}
export default HomeRoutes