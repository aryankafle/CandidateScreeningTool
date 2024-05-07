import { CredentialResponse, GoogleLogin } from '@react-oauth/google'
import axios from "axios"





const LoginButton = () => {

  return (
    <div 
      id = "signInButton"
    >

      <GoogleLogin

        onSuccess={async (credentialResponse : CredentialResponse) => {
          
          await axios.get(`${process.env.REACT_APP_SERVER_NAME}}/login`)
        
        }}

        onError={() => {
          console.log('Login Failed');
        }}

      />

    </div>
  )

}





export default LoginButton