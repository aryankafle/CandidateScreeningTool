import { Route, Routes } from "react-router-dom"
import { useNavigate } from "react-router-dom"

interface Props {
    resumeUploadRoute: string,
    savedListsRoute: string
}

const NavBar = (props: Props) => {

    const navigate = useNavigate()

    function handleResumeUploadClick() {
        navigate(props.resumeUploadRoute)
    }

    function handleSavedListsClick() {
        navigate(props.savedListsRoute)
    }

    return (
        <div className="flex justify-between w-screen">
            <div className="flex py-[75px] bg-[gray] grow justify-center" onClick={handleResumeUploadClick}>
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
    )
}

export default NavBar