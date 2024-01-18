import {GoogleLogin} from '@react-oauth/google'
//import {useState } from "react";
const clientId = "29931420007-dp18uidt963gicfb6niv4maf74p26le9.apps.googleusercontent.com"

function Login(){
    //const [JWT, setJWT] = useState(null)
    return <div id = "signInButton">
        <GoogleLogin
            onSuccess={credentialResponse => {
                console.log(credentialResponse);
                
              }}
              onError={() => {
                console.log('Login Failed');
              }}
        />
    </div>
}
export default Login

