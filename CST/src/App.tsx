import { QueryClient,  QueryClientProvider } from "react-query"
import AppContextProvider from "./context"
import Router from "./router"





const queryClient = new QueryClient();





function App() {
  
  return (
    <QueryClientProvider client={queryClient}> 
      <AppContextProvider>
        <Router />
      </AppContextProvider>
    </QueryClientProvider>
  )
}

export default App