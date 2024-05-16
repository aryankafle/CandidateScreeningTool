import { Route, Routes } from "react-router-dom"
import ViewSavedLists from "../pages/ViewSavedListsScreen"
import ResumeUpload from "../pages/ResumeUploadScreen"
import PageNotFoundScreen from "../pages/PageNotFoundScreen"
import ResultsScreen from "../pages/ResultsScreen"
import { useContext, useEffect } from "react"
import BatchContext from "../context/BatchContext"
import SelectionContext from "../context/SelectionContext"






const HomeRoutes = () => {
    
    const { clearBatchContext } = useContext(BatchContext)

    const { clearSelectionContext } = useContext(SelectionContext)

    useEffect(() => {

        clearBatchContext()
        clearSelectionContext()

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])





    return (
        <Routes>
            <Route path="/resume-upload" element={<ResumeUpload />} />
            <Route path="/saved-lists" element={<ViewSavedLists />} />
            <Route path="/results" element={<ResultsScreen />} />
            <Route path="/" element={<ResumeUpload />} />
            <Route path="/*" element={<PageNotFoundScreen />} />
        </Routes>
        
    )
}

export default HomeRoutes