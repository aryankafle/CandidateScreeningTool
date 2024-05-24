import { QueryClient,  QueryClientProvider } from "react-query"
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { BrowserRouter } from "react-router-dom";
import '@fontsource/raleway'
import AppContextProvider from "./context"
import Router from "./router"





const queryClient = new QueryClient();





const theme = createTheme({
  
  palette: {

    background: {



    }

  },

  typography: {

    fontFamily: "Raleway"

  }

});  





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