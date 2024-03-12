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
        <div className="flex justify-between text-xl bg-gray dark:bg-black">
            <Button className={
                    currentTab === "resume-upload" ?
                        `text-black hover:bg-grayMid
                        dark:text-white dark:hover:bg-grayMid/30
                        flex py-[1rem] grow justify-center border-b-4`
                    :
                        `text-black hover:bg-grayMid
                        dark:text-white dark:hover:bg-grayMid/30
                        flex py-[1rem] grow justify-center `
                    }
                    onClick={handleResumeUploadClick}>
                Resume Upload
            </Button>
            <Button className={
                    currentTab === "saved-lists" ?
                        `text-black hover:bg-red 
                        dark:text-white dark:hover:bg-red
                        flex py-[1rem] grow justify-center border-b-4`
                    :
                        `text-black hover:bg-red
                        dark:text-white dark:hover:bg-red
                        flex py-[1rem] grow justify-center `
                    }
                    onClick={handleSavedListsClick}>
                Saved Lists
            </Button>
        </div>
    )
}

export default NavBar