import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import PageNotFoundScreen from '../pages/PageNotFoundScreen';



import HomeRoutes from "./HomeRouter";

import { getUserSavedLists, getUser, getUserSelection, deleteUnusedFiles } from "../requests/ResumeRequests"

import FilterScreen from "../pages/FilterScreen"
import SplashScreen from "../pages/SplashScreen"
import TestScreen from "../test/App.api.test"
import ResultsScreen from "../pages/ResultsScreen"



import BaseLayout from "../layouts/BaseLayout"
import DecoratedLayout from "../layouts/DecoratedLayout";
import HomeLayout from "../layouts/HomeLayout";
import HeaderButtons from "../components/UI/FilterScreenHeaderButtons";
import BackButton from "../components/buttons/BackButton";



import UserContext from "../context/UserContext";
import { SavedListsContext } from "../context/SavedListsContext";
import { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom"
import FlagContext from "../context/FlagContext";
import { SavedList } from '../utils/SavedList';
import BatchContext from '../context/BatchContext';





function Router() {
    
    const { setUserData, isLoggedIn } = useContext(UserContext)
    const { setSavedLists, setCurrentSavedList } = useContext(SavedListsContext)
    const { setLoadingState } = useContext(FlagContext)
    const { fileProgresses } = useContext(BatchContext)

    useEffect(() => {

        console.log(fileProgresses)

    }, [fileProgresses])

    const route = useLocation()

    const navigate = useNavigate()



    useEffect(() => {

        setLoadingState(false)

    }, [route, setLoadingState])



    useEffect(() => {
        deleteUnusedFiles()
        
        getUser()
        .then(async (userData) => {

            setUserData(userData)

            const savedLists = await getUserSavedLists(userData.id)

            setSavedLists(savedLists)

            const selection = await getUserSelection(userData.id)

            if(selection.currentSavedList) {

                const savedList = savedLists.find((list) => list._id === selection.currentSavedList)

                setCurrentSavedList(savedList)

            }

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
                        <>
                            <div className="flex flex-col flex-shrink">
                                <HeaderButtons />
                            </div>
                            <div className="flex h-full w-full overflow-auto">
                                <FilterScreen />
                            </div>
                        </>
                        :
                        <Navigate to="/"/>
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
                        <Navigate to="/"/>
                    }
                />
            </Route>
            <Route element={<BaseLayout />}>
                <Route index element={<SplashScreen />} />
                <Route path="/test" element={<TestScreen />} />
                <Route path="*" element={<PageNotFoundScreen />} />
            </Route>
            <Route element={<HomeLayout />}>
                <Route 
                    path="/home/*"
                    element={ isLoggedIn ? <HomeRoutes /> : <Navigate to="/"/> }
                />
            </Route>
        </Routes>
    )
}

export default Router