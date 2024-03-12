import { useNavigate } from "react-router-dom"

const SplashScreen = () => {
    const navigate = useNavigate()

    return (
        <div className="flex items-center justify-center text-7xl m-20
                        animate-text bg-gradient-to-r from-blueDark to-blueLight bg-clip-text text-transparent">
            Candidate Screening Tool
        </div>
             
    )
}

export default SplashScreen