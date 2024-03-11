import { QueryClient,  QueryClientProvider } from "react-query"
import { BrowserRouter } from "react-router-dom";
import AppContextProvider from "./context"
import Router from "./router"





const queryClient = new QueryClient();





function App() {
  
  return (
    <QueryClientProvider client={queryClient}> 
      <AppContextProvider>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </AppContextProvider>
    </QueryClientProvider>
  )
}

export default App