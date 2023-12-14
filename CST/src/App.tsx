import {Routes, Route, BrowserRouter } from "react-router-dom";
import PageNotFoundPopup from './components/PageNotFoundPopup';

import Login from "./pages/LoginPage/Login.index";
import Home from "./router/HomeTab";
import NavBar from "./components/NavBar";

import SplashScreen from "./pages/SplashScreen.index.tsx"

function App() {
  return (
    <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path = "/" element = {<SplashScreen></SplashScreen>}>
            <Route index element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="*" element={<PageNotFoundPopup />} />
          </Route>
        </Routes>
    </BrowserRouter>

  )
}

export default App