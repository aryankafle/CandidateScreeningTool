import {Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import PageNotFoundPopup from './components/PageNotFoundPopup';

function App() {
  return (
    <>
        <NavBar />
        <Routes>
          <Route index element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="*" element={<PageNotFoundPopup />} />
        </Routes>
    </>
  )
}

export default App