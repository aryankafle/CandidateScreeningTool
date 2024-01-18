import {googleLogout} from '@react-oauth/google'


function Logout(){
    
      
    return <button onClick={() => googleLogout()}>
            Sign out with Google 🚀
        </button>
    
}
export default Logout