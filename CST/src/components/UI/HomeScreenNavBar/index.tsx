import { useNavigate } from "react-router-dom"
import { useState } from "react"
import Button from "../../buttons/ImprovedButtonComponent"





const NavBar = () => {

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
        <div className="flex justify-between">
            <Button className={
                    currentTab === "resume-upload" ?
                        `bg-black text-white hover:bg-gray
                        dark:bg-black dark:text-white dark:hover:bg-grayMidDark
                        flex py-[1rem] grow justify-center border-b-4 border-white`
                    :
                        `bg-black text-white hover:bg-gray
                        dark:bg-black dark:text-white dark:hover:bg-grayMidDark
                        flex py-[1rem] grow justify-center`
                    }
                    onClick={handleResumeUploadClick}>
                Resume Upload
            </Button>
            <Button className={
                    currentTab === "saved-lists" ?
                        `bg-black text-white hover:bg-gray
                        dark:bg-black dark:text-white dark:hover:bg-grayMidDark
                        flex py-[1rem] grow justify-center border-b-4 border-white`
                    :
                        `bg-black text-white hover:bg-gray
                        dark:bg-black dark:text-white dark:hover:bg-grayMidDark
                        flex py-[1rem] grow justify-center`
                    }
                    onClick={handleSavedListsClick}>
                Saved Lists
            </Button>
        </div>
    )
}

export default NavBar