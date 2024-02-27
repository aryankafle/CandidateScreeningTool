import { GoogleLogin } from '@react-oauth/google'
import axios from "axios"

// //import {useState } from "react";
// const clientId = process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID
// const clientSecret = process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_SECRET
// const redirectUrl =  'http://localhost:3000/home'
// //'https://accounts.google.com/o/oauth2/v2/auth'





function Login(){
  return <div id = "signInButton">
      <GoogleLogin
          onSuccess={async credentialResponse => {
            await axios.get(`${process.env.REACT_APP_SERVER_HOST}:${process.env.REACT_APP_SERVER_PORT}/login`)
            const gruh = await axios.get(`${process.env.REACT_APP_SERVER_HOST}:${process.env.REACT_APP_SERVER_PORT}/Auth/authtest`)
            console.log(gruh);
            }}
            onError={() => {
              console.log('Login Failed');
            }}
      />
  </div>
}
 export default Login

