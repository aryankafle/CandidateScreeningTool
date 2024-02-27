import LoginButton from '../../components/buttons/LoginButton'
 // import LogoutButton from '../../components/buttons/LogoutButton'
// import  axios  from 'axios';
// import querystring from 'querystring'
// import oauth from 'axios-oauth-client'
// import { createWorker } from 'tesseract.js';
//import test from './test.png'
// import {pdfToPng, PngPageOutput} from 'pdf-to-png-converter'
// import {useQuery} from "react-query"
// import {useEffect, useState} from "react"

// const clientId = process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID as string
// const clientSecret = process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_SECRET as string
// const redirectUrl =  'http://localhost:3000/home'
//'https://accounts.google.com/o/oauth2/v2/auth'

import { useGoogleLogin, googleLogout } from '@react-oauth/google'
import axios from "axios"

async function requests(){
    await axios.get(`${process.env.REACT_APP_SERVER_HOST}:${process.env.REACT_APP_SERVER_PORT}/login`)
    const gruh = await axios.get(`${process.env.REACT_APP_SERVER_HOST}:${process.env.REACT_APP_SERVER_PORT}/Auth/authtest`)

}

const logout = async() => {
    await axios.get(`${process.env.REACT_APP_SERVER_HOST}:${process.env.REACT_APP_SERVER_PORT}/logout`)
    googleLogout()
}
const LoginScreen = () => {



    const asynclogin = useGoogleLogin({
        onSuccess: async response => await requests()
        //onSuccess: requests()
        // onSuccess: async tokenResponse => {console.log(tokenResponse),
        // await axios.get(`${process.env.REACT_APP_SERVER_HOST}:${process.env.REACT_APP_SERVER_PORT}/login`), 
        // console.log(await axios.get(`${process.env.REACT_APP_SERVER_HOST}:${process.env.REACT_APP_SERVER_PORT}/Auth/authtest`))}

        });

    
    return (
        <div>
            {/* { <LoginButton /> } */}
            <button
                onClick = {() => asynclogin()}>
                    Login    
                          
            </button>
            <button
                onClick = {() => logout()}>
                    Logout
                        
            </button>
        </div>
        
    )
}

export default LoginScreen