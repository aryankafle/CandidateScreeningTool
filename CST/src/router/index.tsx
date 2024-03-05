import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import PageNotFoundScreen from '../pages/PageNotFoundScreen';



import HomeRoutes from "./HomeRouter";



import FilterScreen from "../pages/FilterScreen"
import SplashScreen from "../pages/SplashScreen"
import TestScreen from "../test/App.api.test"
import ResultsScreen from "../pages/ResultsScreen"
import LoginScreen from "../pages/LoginScreen"
import LogoutScreen from "../pages/LogoutScreen";



import BaseLayout from "../layouts/BaseLayout"
import DecoratedLayout from "../layouts/DecoratedLayout";
import HomeLayout from "../layouts/HomeLayout";
import HeaderButtons from "../components/UI/FilterScreenHeaderButtons";
import BackButton from "../components/buttons/BackButton";



import { UserContext } from "../context/UserContext";
import { useCallback, useContext, useEffect } from "react";
import axios from "axios";





function Router() {

    const { setUserData, isLoggedIn } = useContext(UserContext)

    const getUser = useCallback(async () => {
  
      try {
    
          const { data } = await axios.get(
              `${process.env.REACT_APP_SERVER_HOST}:${process.env.REACT_APP_SERVER_PORT}/auth/login/success`
              , { withCredentials: true }
          )

          console.log("Successfully Signed In: ", data)
          setUserData(data.user)
          
      } 
      catch (error) {
    
          console.log("Error getting user: ", error)
    
      }
    
    }, [setUserData])
    
    useEffect(() => {
      getUser()
    }, [getUser])

    useEffect(() => {
        console.log("Is Logged In: ", isLoggedIn)
    }, [isLoggedIn])

    return (
        <BrowserRouter>
            <Routes>
                <Route element={<DecoratedLayout />}>
                    <Route 
                        path="/filter"
                        element={ isLoggedIn ?
                            <>
                                <div className="flex flex-col flex-shrink">
                                    <HeaderButtons />
                                </div>
                                <div className="flex h-full w-full overflow-auto">
                                    <FilterScreen />
                                </div>
                            </>
                            :
                            <Navigate to="/signin"/>
                        }
                    />
                    <Route 
                        path="/results"
                        element={ isLoggedIn ?
                            <>
                                <div className="flex flex-col flex-shrink">
                                    <BackButton></BackButton>
                                </div>
                                <div className="flex w-full h-full overflow-auto">
                                    <ResultsScreen />
                                </div>
                            </>
                            :
                            <Navigate to="/signin"/>
                        }
                    />
                </Route>
                <Route element={<BaseLayout />}>
                    <Route index element={<SplashScreen />} />
                    <Route path="/signin" element={<LoginScreen />} />
                    <Route path="/signout" element={<LogoutScreen />} />
                    <Route path="/test" element={<TestScreen />} />
                    <Route path="*" element={<PageNotFoundScreen />} />
                </Route>
                <Route element={<HomeLayout />}>
                    <Route path="/home/*" element={isLoggedIn ? <HomeRoutes /> : <Navigate to="/signin"/>} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Router