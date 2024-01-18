import LoginButton from '../../components/LoginButton'
import LogoutButton from '../../components/LogoutButton'
const LoginScreen = () => {
    return (
        <div>
            <LoginButton />
            <button 
                onClick = {LogoutButton}>
                    logout
            </button>
        </div>
        
    )
}

export default LoginScreen