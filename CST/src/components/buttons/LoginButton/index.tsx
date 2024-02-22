import { GoogleLogin } from '@react-oauth/google'

//import {useState } from "react";
const clientId = process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID
const clientSecret = process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_SECRET
const redirectUrl =  'http://localhost:3000/home'
//'https://accounts.google.com/o/oauth2/v2/auth'





function Login(){
    //const [JWT, setJWT] = useState(null)
    return <div id = "signInButton">
      {/* res.writeHead(301, [,"Location"] [,authorizationUrl]) */}
        {/* <GoogleLogin
            onSuccess={credentialResponse => {
                console.log(credentialResponse);
                
                
              }}
              onError={() => {
                console.log('Login Failed');
              }}
        /> */}
    </div>
}
export default Login

