import {googleLogout} from '@react-oauth/google'
const clientId = "29931420007-dp18uidt963gicfb6niv4maf74p26le9.apps.googleusercontent.com"


function Logout(){
    return <div id = "signOutButton">
        googleLogout()
    </div>
}
export default Logout