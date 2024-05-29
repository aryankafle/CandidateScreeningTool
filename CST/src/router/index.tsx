import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import PageNotFoundScreen from '../pages/PageNotFoundScreen';



import HomeRoutes from "./HomeRouter";

import { getUser, getUserSavedLists } from "../requests/ResumeRequests";

import FilterScreen from "../pages/FilterScreen";
import ResultsScreen from "../pages/ResultsScreen";
import SplashScreen from "../pages/SplashScreen";



import BaseLayout from "../layouts/BaseLayout";
import DecoratedLayout from "../layouts/DecoratedLayout";



import { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import FlagContext from "../context/FlagContext";
import { SavedListsContext } from "../context/SavedListsContext";
import UserContext from "../context/UserContext";





function Router() {
    
    const { setUserData, isLoggedIn } = useContext(UserContext)
    const { setSavedLists } = useContext(SavedListsContext)
    const { setLoadingState } = useContext(FlagContext)

    const route = useLocation()

    const navigate = useNavigate()





    useEffect(() => {

        setLoadingState(false)

    }, [route, setLoadingState])



    useEffect(() => {
    
        getUser()
        .then(async (userData) => {

            setUserData(userData)

            const savedLists = await getUserSavedLists(userData.id)

            setSavedLists(savedLists)

            if (route.pathname.includes("results")) return

            navigate("/home")

        })
        .catch((error) => {
            
            if(error.response?.data?.message === "Unauthorized") {

                console.log("Did not find existing user session.")
                return;

            }

            console.log("Error getting user data: ", error)

        })



    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])





    return (
        <Routes>
            <Route element={<DecoratedLayout />}>
                <Route 
                    path="/filter"
                    element={ isLoggedIn ?
                        <FilterScreen />
                        :
                        <Navigate to="/"/>
                    }
                />
                <Route 
                    path="/results"
                >
                    <Route path=":listID" element={<ResultsScreen />} />
                    <Route path="" element={isLoggedIn ?
                        <ResultsScreen />
                        :
                        <Navigate to="/"/>
                    } />
                </Route>
            </Route>
            <Route element={<BaseLayout />}>
                <Route index element={<SplashScreen />} />
                <Route path="*" element={<PageNotFoundScreen />} />
            </Route>
            <Route element={<BaseLayout />}>
                <Route 
                    path="/home/*"
                    element={ isLoggedIn ? <HomeRoutes /> : <Navigate to="/"/> }
                />
            </Route>
        </Routes>
    )
}

export default Router