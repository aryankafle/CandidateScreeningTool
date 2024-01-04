import { useNavigate } from "react-router-dom"

const SplashScreen = () => {
    const navigate = useNavigate()

    return (
        <div className="flex flex-col">
            <span>
                Splash Screen not designed yet as it is not at all important. Instead of a splash screen here's winston from overwatch.
            </span>
            <span>
                Please Click on quinton.jpg to proceed to login page.
            </span>

            <img className="cursor-pointer" onClick={() => {navigate("/login")}} src={`/assets/quinton.jpg`} alt="winton" />
        </div>
             
    )
}

export default SplashScreen