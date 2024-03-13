import { useNavigate } from "react-router-dom"

const SplashScreen = () => {
    const navigate = useNavigate()

    return (
        <div className="bg-gradient-to-t from-blueDark to-black justify-center
                        flex flex-col flex-grow">
            <div className="m-auto">
                <h3 className = "h-[20rem] sm:h-[10rem] font-semibold text-6xl bg-gradient-to-r from-darkerWhite to-white text-transparent bg-clip-text ">
                Candidate Screening Tool
                </h3>
            </div>
        </div>
             
    )
}

export default SplashScreen