import LoginButton from '../../components/buttons/LoginButton'
import LogoutButton from '../../components/buttons/LogoutButton'
import  axios  from 'axios';
import querystring from 'querystring'
import oauth from 'axios-oauth-client'
import { createWorker } from 'tesseract.js';
//import test from './test.png'
import {pdfToPng, PngPageOutput} from 'pdf-to-png-converter'
import {useQuery} from "react-query"
import {useEffect, useState} from "react"

const clientId = process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID as string
const clientSecret = process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_SECRET as string
const redirectUrl =  'http://localhost:3000/home'
//'https://accounts.google.com/o/oauth2/v2/auth'


const LoginScreen = () => {
    
    const pdftest = async () => {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_HOST}:${process.env.REACT_APP_SERVER_PORT}/textScan/convert-pdf-to-img`)
        return response.data
    }
    const TextScanQuery = useQuery({
        queryKey: ['get', 'TextScan', 'testQuery'],
        queryFn: pdftest,
        staleTime: Infinity,
        cacheTime: Infinity
      })
    const textscantest = async () => {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_HOST}:${process.env.REACT_APP_SERVER_PORT}/textScan/scantext`, {
        params: {
            message: TextScanQuery.data?.message ,
        }
    })
        return response.data
    }
    const ImgScanQuery = useQuery({
        queryKey: ['get', 'scantext', 'testQuery'],
        queryFn: textscantest,
        staleTime: Infinity,
        cacheTime: Infinity
      })

    //const img = convert(1);
    // const [account, setAccount] = useState("")
    // const data = { 'grant_type': 'client_credentials'};
    const [response, setResponse] = useState("");
    const [pngPage, setPngPage] = useState([] as PngPageOutput[])
    // const getAuthorizationCode = oauth.authorizationCode(
    //     axios.create(),
    //     'https://oauth.com/2.0/token', // OAuth 2.0 token endpoint
    //     'CLIENT_ID',
    //     'CLIENT_SECRET',
    //     'https://your-app.com/oauth-redirect' // Redirect URL for your app
    //   )
    //   const auth = await getAuthorizationCode('AUTHORIZATION_CODE')
    useEffect(() => {  
        ImgScanQuery.data?.message && setResponse(ImgScanQuery.data.message)  
      }, [ImgScanQuery])

    function login() {
          console.log(response)
        // test(`Convert PDF To PNG`, async () => {
        //     const pngPages: PngPageOutput[] = await pdfToPng('./Half_Day_Schedule.pdf', // The function accepts PDF file path or a Buffer
        //     {
        //         viewportScale: 2.0, 
        //         pagesToProcess: [1],   
        //     });
        //     setPngPage(pngPages)
        // });
        //MOVE TO BACKEND

        // const convertPdfToImg = async () => {
        //     const pngPage = await pdfToPng('./Half_Day_Schedule.pdf', {
        //         pagesToProcess: [1],
        //         viewportScale: 2.0
        // });
        // return pngPage[0].content
        // }
        // setPngPage(convertPdfToImg)
        
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