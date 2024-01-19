import LoginButton from '../../components/buttons/LoginButton'
import LogoutButton from '../../components/buttons/LogoutButton'
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