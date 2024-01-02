import { Route, Routes, useNavigate } from "react-router-dom"
import ViewSavedLists from "../pages/ViewSavedListsScreen"
import ResumeUpload from "../pages/ResumeUploadScreen"

import PageNotFoundPopup from "../pages/PageNotFoundScreen"
import { useState } from "react"

const HomeRoutes = () => {
    const navigate = useNavigate()
    const [currentTab, setCurrentTab] = useState("resume-upload")

    function handleResumeUploadClick() {
        navigate("/home/resume-upload")
        setCurrentTab("resume-upload")
    }

    function handleSavedListsClick() {
        navigate("/home/saved-lists")
        setCurrentTab("saved-lists")
    }

    return (
        <>
            <div className="flex justify-between w-screen">
                <div className={
                        currentTab === "resume-upload" ?
                            `bg-gray text-black hover:bg-red 
                            dark:bg-gray dark:text-white dark:hover:bg-red
                            flex py-[75px] grow justify-center`
                        :
                            `bg-white text-black hover:bg-red
                            dark:bg-black dark:text-white dark:hover:bg-red
                            flex py-[75px] grow justify-center`
                     }
                     onClick={handleResumeUploadClick}>
                    <text>
                        Resume Upload
                    </text>
                </div>
                <div className={
                        currentTab === "saved-lists" ?
                            `bg-gray text-black hover:bg-red 
                            dark:bg-gray dark:text-white dark:hover:bg-red
                            flex py-[75px] grow justify-center`
                        :
                            `bg-white text-black hover:bg-red
                            dark:bg-black dark:text-white dark:hover:bg-red
                            flex py-[75px] grow justify-center`
                     }
                     onClick={handleSavedListsClick}>
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