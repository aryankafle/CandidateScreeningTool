import { Routes, Route, BrowserRouter } from "react-router-dom";
import PageNotFoundScreen from '../pages/PageNotFoundScreen';



import HomeRoutes from "./homeRouter";
import AuthRoutes from "./authRouter";

import FilterScreen from "../pages/FilterScreen"
import SplashScreen from "../pages/SplashScreen"
import TestScreen from "../test/App.api.test"
import ResultsScreen from "../pages/ResultsScreen"



import BaseLayout from "../layouts/BaseLayout"
import DecoratedLayout from "../layouts/DecoratedLayout";
import HomeLayout from "../layouts/HomeLayout";





function Router() {
    return (
        <BrowserRouter>
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
        </BrowserRouter>
    )
}

export default Router