import LoginButton from '../../components/LoginButton'
import LogoutButton from '../../components/LogoutButton'
import  axios  from 'axios';
import {useState } from "react";

const LoginScreen = () => {
    const [account, setAccount] = useState("")
    function logout() {
        //window.location.href = "https://localhost:3000/oauth/revoke"
        


        axios.get('/user?ID=29931420007-dp18uidt963gicfb6niv4maf74p26le9.apps.googleusercontent.com')
            .then(function (response: any) {
            // handle success
                setAccount(response);
                console.log(response);
        })
            .catch(function (error: any) {
                // handle error
                console.log(error);
        })
            .finally(function () {
                // always executed
        });

        // var options = {
        //     method: 'POST',
        //     url: 'https://localhost:3000/oauth/revoke',
        //     headers: {'content-type': 'application/json'},
        //     data: {
        //       client_id: '29931420007-dp18uidt963gicfb6niv4maf74p26le9.apps.googleusercontent.com',
        //       client_secret: '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',
        //       token: 'https://localhost:3000/oauth/token'
        //     }
        //   };

          

        //   axios.get(options).then(function (response : any) {
        //     console.log(response.data);
        //   }).catch(function (error: any) {
        //     console.error(error);
        //   });
        
    
      
    }
    return (
        <div>
            <LoginButton />
            <button 
                onClick = {logout}>
                    grr
                        
            </button>
        </div>
        
    )
}

export default LoginScreen