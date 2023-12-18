import { Outlet, Link } from "react-router-dom";
import Footer from "../components/FooterComponent"
import Header from "../components/HeaderComponent"

/*
This component is rendered on all routes.
*/

const Layout = () => {
  return (
    <>
    

      <Outlet />
    </>
  )
};

export default Layout;