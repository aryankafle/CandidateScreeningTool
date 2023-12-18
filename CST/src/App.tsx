import { Routes, Route } from "react-router-dom";
import PageNotFoundPopup from './pages/PageNotFoundScreen';

import Home from "./router/Home.route";
import Auth from "./router/Auth.route";
import Filter from "./router/Filter.route"
import Results from "./router/Results.route"

import SplashScreen from "./pages/SplashScreen"
import Test from "./test/App.api.test"
import BaseLayout from "./router/layouts/BaseLayout.route"
import DecoratedLayout from "./router/layouts/DecoratedLayout";

function App() {
return (
      <Routes>
        <Route element={<DecoratedLayout />}>
            <Route path="/filter" element={<Filter />} />
            <Route path="/results" element={<Results />} />
        </Route>
        <Route element={<BaseLayout />}>
          <Route index element={<SplashScreen />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/home" element={<Home />} />
        ` <Route path="/test" element={<Test />} />
          <Route path="*" element={<PageNotFoundPopup />} />
        </Route>
      </Routes>
  )
}

export default App