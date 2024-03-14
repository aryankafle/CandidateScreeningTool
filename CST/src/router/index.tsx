import { Routes, Route, Navigate } from 'react-router-dom';
import PageNotFoundScreen from '../pages/PageNotFoundScreen';



import HomeRoutes from "./HomeRouter";
import AuthRoutes from "./AuthRouter"

import { getAllUserSavedLists, getUserSelection } from "../requests/ResumeRequests"

import FilterScreen from "../pages/FilterScreen"
import SplashScreen from "../pages/SplashScreen"
import TestScreen from "../test/App.api.test"
import ResultsScreen from "../pages/ResultsScreen"



import BaseLayout from "../layouts/BaseLayout"
import DecoratedLayout from "../layouts/DecoratedLayout";
import HomeLayout from "../layouts/HomeLayout";
import HeaderButtons from "../components/UI/FilterScreenHeaderButtons";
import BackButton from "../components/buttons/BackButton";



import { UserContext } from "../context/UserContext";
import { SavedListsContext } from "../context/SavedListsContext";
import { SelectionContext } from "../context/SelectionContext";
import { useCallback, useContext, useEffect } from "react";
import { useLocation } from "react-router-dom"
import axios from "axios";
import { FlagContext } from "../context/FlagContext";





function Router() {
    
    const { userData, setUserData, isLoggedIn } = useContext(UserContext)
    const { setSavedLists } = useContext(SavedListsContext)
    const { setLocation } = useContext(SelectionContext)
    const { setLoadingState } = useContext(FlagContext)





    const route = useLocation()

    useEffect(() => {

        setLoadingState(false)
        
    }, [route.key, setLoadingState])

    useEffect(() => {

        setLocation(
            (location : string) => {

            if(!location) return location;

            return route.pathname;

        })

    }, [route.pathname, setLocation])





    // useEffect(() => {
        
    //     if(!userData) return;

    //     getUserSelection(userData.id)
    //     .then((response) => {

    //         const savedLocation : string = response.location

    //         if(!savedLocation) navigate("/")

    //         if(savedLocation) navigate(savedLocation)

    //     })
    //     .catch((error) => {

    //         console.log("Error fetching user selection")

    //     })

    // }, [ setLocation, userData ])





    const getUser = useCallback(async () => {

        if(userData) return;

        const { data } = await axios.get(
            `${process.env.REACT_APP_SERVER_NAME}/auth/login/success`
            , { withCredentials: true }
        )

        console.log("Successfully Signed In: ", data)
        
        return data.user
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])





    useEffect(() => {

        getUser()
        .then(async (data) => {

            setUserData(data)



            const savedLists = await getAllUserSavedLists(data.id)

            setSavedLists(savedLists)

        })
        .catch((error) => {
            
            // if(error.response.data.message === "Unauthorized") {

            //     console.log("Did not find existing user session.")
            //     return;

            // }

            console.log("Error getting user data: ", error)

        })



    }, [getUser, setSavedLists, setUserData])




    
    useEffect(() => {

        console.log("Is Logged In: ", isLoggedIn)

    }, [isLoggedIn])





    return (
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
                        <Navigate to="/auth/signin"/>
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
                        <Navigate to="/auth/signin"/>
                    }
                />
            </Route>
            <Route element={<BaseLayout />}>
                <Route index element={<SplashScreen />} />
                <Route path="/auth/*" element={<AuthRoutes />}/>
                <Route path="/test" element={<TestScreen />} />
                <Route path="*" element={<PageNotFoundScreen />} />
            </Route>
            <Route element={<HomeLayout />}>
                <Route 
                    path="/home/*"
                    element={ isLoggedIn ? <HomeRoutes /> : <Navigate to="/auth/signin"/> }
                />
            </Route>
        </Routes>
    )
}

export default Router