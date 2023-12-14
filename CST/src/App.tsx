import {Routes, Route } from "react-router-dom";
import PageNotFoundPopup from './components/PageNotFoundPopup';

import Home from "./router/Home.routes";

import SplashScreen from "./pages/SplashScreen"
import Test from "./test/App.api.test"

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