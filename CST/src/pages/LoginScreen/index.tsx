import LoginButton from '../../components/LoginButton'
import LogoutButton from '../../components/LogoutButton'
const LoginScreen = () => {
    // useEffect(() => {
    //     function start(){
    //         gapi.client.init({
    //             clientId: clientId,
    //             scope: ""
    //         })
    //     }
    
    // gapi.load ('client:auth2', start)
    // });
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