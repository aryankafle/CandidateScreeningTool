import { useLocation, useNavigate } from "react-router-dom"
import Button from "../../buttons/ImprovedButtonComponent"





const NavBar = () => {

    const navigate = useNavigate()

    const location = useLocation()





    function handleResumeUploadClick() {

        navigate("/home/resume-upload")

    }



    function handleSavedListsClick() {

        navigate("/home/saved-lists")

    }




    return (
        <div className="flex justify-between">
            <Button className={
                    location.pathname === "/home/resume-upload" ?
                        `bg-black text-white hover:bg-gray
                        dark:bg-black dark:text-white dark:hover:bg-black/90
                        flex py-[1rem] grow justify-center border-b-4 border-white`
                    :
                        `bg-black text-white hover:bg-gray
                        dark:bg-black dark:text-white dark:hover:bg-black/90
                        flex py-[1rem] grow justify-center`
                    }
                    onClick={handleResumeUploadClick}>
                Resume Upload
            </Button>
            <Button className={
                    location.pathname === "/home/saved-lists" ?
                        `bg-black text-white hover:bg-gray
                        dark:bg-black dark:text-white dark:hover:bg-black/90
                        flex py-[1rem] grow justify-center border-b-4 border-white`
                    :
                        `bg-black text-white hover:bg-gray
                        dark:bg-black dark:text-white dark:hover:bg-black/90
                        flex py-[1rem] grow justify-center`
                    }
                    onClick={handleSavedListsClick}>
                Saved Lists
            </Button>
        </div>
    )
}

export default NavBar