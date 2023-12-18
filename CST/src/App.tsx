import {Routes, Route } from "react-router-dom";
import PageNotFoundPopup from './pages/PageNotFoundScreen';

import Home from "./router/Home.route";
import Auth from "./router/Auth.route";
import Filter from "./router/Filter.route"
import Results from "./router/Results.route"

import SplashScreen from "./pages/SplashScreen"
import Test from "./test/App.api.test"
import Layout from "./router/Layout.route"

function App() {
return (
      <Routes>
        <Route path = "/" element={<Layout />}>
          <Route index element={<SplashScreen />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/home" element={<Home />} />
          <Route path="/filter" element={<Filter />} />
          <Route path="/results" element={<Results />} />
        ` <Route path="/test" element={<Test />} />
          <Route path="*" element={<PageNotFoundPopup />} />
        </Route>
      </Routes>
  )
}

export default App