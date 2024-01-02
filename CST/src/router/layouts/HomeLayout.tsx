import { Outlet, useNavigate } from "react-router-dom"
import { useState } from "react"
import Header from '../../components/HeaderComponent'
import Footer from '../../components/FooterComponent'


const HomeLayout = () => {
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
        <div className="h-screen flex flex-col">
            <Header />
            <div className="flex justify-between">
                <button className={
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
                    Resume Upload
                </button>
                <button className={
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
                    Saved Lists
                </button>
            </div>
            <div className="flex flex-grow">
                <Outlet />
            </div>
            
        </div>
        
    )
}
export default HomeLayout