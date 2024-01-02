import { Routes, Route } from "react-router-dom";
import PageNotFoundScreen from './pages/PageNotFoundScreen';



import HomeRoutes from "./router/Home.route";
import AuthRoutes from "./router/Auth.route";



import FilterScreen from "./pages/FilterScreen"
import ResultsScreen from "./router/Results.route"
import SplashScreen from "./pages/SplashScreen"
import TestScreen from "./test/App.api.test"
import BaseLayout from "./router/layouts/BaseLayout"
import DecoratedLayout from "./router/layouts/DecoratedLayout";
import HomeLayout from "./router/layouts/HomeLayout";

function App() {
return (
      <Routes>
        <Route element={<DecoratedLayout />}>
            <Route path="/filter" element={<FilterScreen />} />
            <Route path="/results" element={<ResultsScreen />} />
        </Route>
        <Route element={<BaseLayout />}>
          <Route index element={<SplashScreen />} />
          <Route path="/login" element={<AuthRoutes />} />
        ` <Route path="/test" element={<TestScreen />} />
          <Route path="*" element={<PageNotFoundScreen />} />
        </Route>
        <Route element={<HomeLayout />}>
            <Route path="/home/*" element={<HomeRoutes />} />
        </Route>
      </Routes>
  )
}

export default App