import { GoogleLogin } from '@react-oauth/google'
//import {useState } from "react";
const clientId = process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID

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

