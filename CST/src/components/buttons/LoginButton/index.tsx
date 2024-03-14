import { GoogleLogin } from '@react-oauth/google'
import axios from "axios"





function Login(){
  return <div id = "signInButton">
      <GoogleLogin
          onSuccess={async credentialResponse => {
            await axios.get(`${process.env.REACT_APP_SERVER_NAME}}/login`)
            const gruh = await axios.get(`${process.env.REACT_APP_SERVER_NAME}}/Auth/authtest`)
            console.log(gruh);
            }}
            onError={() => {
              console.log('Login Failed');
            }}
      />
      
  </div>
}
 export default Login

