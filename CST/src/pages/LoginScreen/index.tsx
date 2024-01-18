import LoginButton from '../../components/LoginButton'
import LogoutButton from '../../components/LogoutButton'
import {useEffect} from 'react'
import {gapi} from 'gapi-script'
import { GoogleOAuthProvider } from '@react-oauth/google';

<GoogleOAuthProvider clientId="<29931420007-dp18uidt963gicfb6niv4maf74p26le9.apps.googleusercontent.com>">...</GoogleOAuthProvider>;
const clientId = "29931420007-dp18uidt963gicfb6niv4maf74p26le9.apps.googleusercontent.com"

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
            <LogoutButton />
        </div>
        
    )
}

export default LoginScreen