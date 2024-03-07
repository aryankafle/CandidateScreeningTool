import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import PageNotFoundScreen from '../pages/PageNotFoundScreen';



import HomeRoutes from "./HomeRouter";
import AuthRoutes from "./AuthRouter"

import {getDefaultListResults} from "../requests/ResumeRequests"

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
import { SavedList, SavedListsContext } from "../context/SavedListsContext";
import { SetStateAction, useCallback, useContext, useEffect, useState } from "react";
import axios from "axios";





function Router() {
    
    const { userData, setUserData, isLoggedIn } = useContext(UserContext)
    const { savedLists, setSavedLists } = useContext(SavedListsContext)





    const getUser = useCallback(async () => {

        const { data } = await axios.get(
            `${process.env.REACT_APP_SERVER_HOST}:${process.env.REACT_APP_SERVER_PORT}/auth/login/success`
            , { withCredentials: true }
        )

        console.log("Successfully Signed In: ", data)
        
        return data.user
    
    }, [])





    const getSavedListData = useCallback(async () => {

        const savedListData = await getDefaultListResults(userData.id)

        if(!savedListData) return [];

        
        
        const savedListArr : SavedList[] = []

        for(let i = 0; i < savedListData.length; i++) {

            const savedList = savedListData[i]

            const currentList = new SavedList(savedList?.name, savedList?.description, savedList?.resumes, savedList?.color)

            currentList.id = savedList.id
            
            savedListArr.push(currentList) 
            
        }

        return savedListArr

    }, [userData])




    
    useEffect(() => {

        getUser()
        .then((data) => setUserData(data))
        .catch((error) => {

            console.log("Error getting user: ", error)

        })

    }, [])



    useEffect(() => {
        
        if(!userData) return;

        getSavedListData()
        .then((data: SavedList[]) => setSavedLists(data))
        .catch((error) => {

            console.log("Error getting user's saved lists: ", error)

        })

    }, [getSavedListData])



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
                    <Route path="/home/*" element={isLoggedIn ? <HomeRoutes /> : <Navigate to="/auth/signin"/>} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Router