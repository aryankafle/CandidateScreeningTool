import { Routes, Route, BrowserRouter } from "react-router-dom";
import PageNotFoundScreen from '../pages/PageNotFoundScreen';



import HomeRoutes from "./HomeRouter";



import FilterScreen from "../pages/FilterScreen"
import SplashScreen from "../pages/SplashScreen"
import TestScreen from "../test/App.api.test"
import ResultsScreen from "../pages/ResultsScreen"
import LoginScreen from "../pages/LoginScreen"



import BaseLayout from "../layouts/BaseLayout"
import DecoratedLayout from "../layouts/DecoratedLayout";
import HomeLayout from "../layouts/HomeLayout";
import HeaderButtons from "../components/UI/FilterScreenHeaderButtons";
import BackButton from "../components/buttons/BackButton";





function Router() {

    return (
        <BrowserRouter>
            <Routes>
                <Route element={<DecoratedLayout />}>
                    <Route path="/filter"
                            element={
                                <>
                                    <div className="flex flex-col flex-shrink">
                                        <HeaderButtons />
                                    </div>
                                    <div className="flex h-full w-full overflow-auto">
                                        <FilterScreen />
                                    </div>
                                </>
                            }
                    />
                    <Route path="/results" element={
                        <>
                            <div className="flex flex-col flex-shrink">
                                <BackButton></BackButton>
                            </div>
                            <div className="flex w-full h-full overflow-auto">
                                <ResultsScreen />
                            </div>
                        </>
                        }
                    />
                </Route>
                <Route element={<BaseLayout />}>
                    <Route index element={<SplashScreen />} />
                    <Route path="/login" element={<LoginScreen />} />
                    <Route path="/test" element={<TestScreen />} />
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