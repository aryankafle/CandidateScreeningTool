import { QueryClient,  QueryClientProvider } from "react-query"
import AppContextProvider from "./context"
import Router from "./router"
import { GoogleOAuthProvider } from '@react-oauth/google';





const queryClient = new QueryClient();





function App() {
  return (
    <GoogleOAuthProvider clientId="29931420007-dp18uidt963gicfb6niv4maf74p26le9.apps.googleusercontent.com">
      <QueryClientProvider client={queryClient}>
        <AppContextProvider>
          <Router />
        </AppContextProvider>
      </QueryClientProvider>
    </GoogleOAuthProvider>
  )
}

export default App