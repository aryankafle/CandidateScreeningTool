import '@fontsource/raleway';
import { ThemeProvider } from '@mui/material/styles';
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import AppContextProvider from "./context";
import Router from "./router";
import { theme } from "./theme";





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