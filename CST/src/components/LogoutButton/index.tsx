import {GoogleLogin, GoogleLogout} from 'react-google-login'
const clientId = "29931420007-dp18uidt963gicfb6niv4maf74p26le9.apps.googleusercontent.com"


function Logout(){
    const onSuccess = () =>{
        console.log("Log Out Successful!")
    }
    return (
        <div id = "signOutButton">
            <GoogleLogout
                clientId ={clientId}
                buttonText ={"Logout"}
                onLogoutSuccess = {onSuccess}
                />
        </div>
    )
}
export default Logout