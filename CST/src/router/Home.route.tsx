import { Route, Routes, useNavigate } from "react-router-dom"
import ViewSavedLists from "../pages/ViewSavedListsScreen"
import ResumeUpload from "../pages/ResumeUploadScreen"

import PageNotFoundPopup from "../pages/PageNotFoundScreen"

const HomeRoutes = () => {
    const navigate = useNavigate()

    function handleResumeUploadClick() {
        navigate("/home/resume-upload")
    }

    function handleSavedListsClick() {
        navigate("/home/saved-lists")
    }

    return (
        <>
            <div className="flex justify-between w-screen">
                <div className="hover:bg-[blue] flex py-[75px] bg-[gray] grow justify-center" onClick={handleResumeUploadClick}>
                    <text>
                        Resume Upload
                    </text>
                </div>
                <div className="flex py-[75px] bg-[burlywood] grow justify-center" onClick={handleSavedListsClick}>
                    <text>
                        Saved Lists
                    </text>
                </div>
            </div>
            <Routes>
                <Route path="/resume-upload" element={<ResumeUpload />} />
                <Route path="/saved-lists" element={<ViewSavedLists />} />
                <Route path="/*" element={<PageNotFoundPopup />} />
            </Routes>
        </>
        
    )
}
export default HomeRoutes