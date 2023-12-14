import {Routes, Route, BrowserRouter } from "react-router-dom";
import PageNotFoundPopup from './components/PageNotFoundPopup';

import Home from "./router/Home.routes";
import NavBar from "./components/NavBar";

import SplashScreen from "./pages/SplashScreen"
import Test from "./test/App.test"

function App() {
return (
      <Routes>
        <Route path = "/">
          <Route index element={<SplashScreen />} />
          <Route path="/home" element={<Home />} />
        ` <Route path="/test" element={<Test />} />
          <Route path="*" element={<PageNotFoundPopup />} />
        </Route>
      </Routes>
  )
}

export default App