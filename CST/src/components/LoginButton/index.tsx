import {GoogleLogin} from 'react-google-login'
const clientId = "29931420007-dp18uidt963gicfb6niv4maf74p26le9.apps.googleusercontent.com"

function Login(){
    const onSuccess = (res: any) =>{
        console.log("LOGIN SUCCESS! Current user : ", res.profileObj)
    }
    const onFailure = (res: any) => {
        console.log("LOGIN FAILED! res: ", res)
    }
    return <div id = "signInButton">
        <GoogleLogin
            clientId= {clientId}
            buttonText = "Login"
            onSuccess = {onSuccess}
            onFailure = {onFailure}
            cookiePolicy = {'single_host_origin'}
            isSignedIn = {true}
        />
    </div>
}
export default Login

