import { Outlet, Link } from "react-router-dom";
import Footer from '../components/FooterComponent'
import Header from '../components/HeaderComponent'

/*
This component is rendered on all routes.
*/

const Layout = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
};

export default Layout;