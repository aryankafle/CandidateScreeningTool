import { QueryClient,  QueryClientProvider } from "react-query"
import AppContextProvider from "./context"
import Router from "./router"
import { GoogleOAuthProvider } from '@react-oauth/google';

//const { auth } = require('express-openid-connect')


const queryClient = new QueryClient();





function App() {
  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID as string}>
      <QueryClientProvider client={queryClient}>
        <AppContextProvider>
          <Router />
        </AppContextProvider>
      </QueryClientProvider>
    </GoogleOAuthProvider>
  )
}

export default App