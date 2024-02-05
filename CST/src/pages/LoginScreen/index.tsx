import LoginButton from '../../components/buttons/LoginButton'
import LogoutButton from '../../components/buttons/LogoutButton'
import  axios  from 'axios';
import {useState } from "react";
import querystring from 'querystring'
import oauth from 'axios-oauth-client'
import { createWorker } from 'tesseract.js';
import test from './test.png'


const clientId = process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID as string
const clientSecret = process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_SECRET as string
const redirectUrl =  'http://localhost:3000/home'
//'https://accounts.google.com/o/oauth2/v2/auth'



const LoginScreen = () => {
    const [account, setAccount] = useState("")
    const data = { 'grant_type': 'client_credentials'};
    const [response, setResponse] = useState("");
    // const getAuthorizationCode = oauth.authorizationCode(
    //     axios.create(),
    //     'https://oauth.com/2.0/token', // OAuth 2.0 token endpoint
    //     'CLIENT_ID',
    //     'CLIENT_SECRET',
    //     'https://your-app.com/oauth-redirect' // Redirect URL for your app
    //   )
    //   const auth = await getAuthorizationCode('AUTHORIZATION_CODE')




    function login() {
        (async () => {
            const worker = await createWorker('eng');
            const ret = await worker.recognize(test)
            console.log(ret.data.text);
            setResponse(ret.data.text)
            await worker.terminate();
          })();  
    }
    return (
        <div>
            {/* <LoginButton /> */}
            <button 
                onClick = {login}>
                    GRUH
                        
            </button>
        </div>
        
    )
}

export default LoginScreen