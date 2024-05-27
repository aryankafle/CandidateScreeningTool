import { QueryClient,  QueryClientProvider } from "react-query"
import { ThemeProvider } from '@mui/material/styles';
import { theme } from "./theme"
import { BrowserRouter } from "react-router-dom";
import '@fontsource/raleway'
import AppContextProvider from "./context"
import Router from "./router"





const queryClient = new QueryClient();





 





function App() {
  
  return (
    <QueryClientProvider client={queryClient}> 
      <AppContextProvider>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <Router />
          </BrowserRouter>
        </ThemeProvider>
      </AppContextProvider>
    </QueryClientProvider>
  )
}

export default App