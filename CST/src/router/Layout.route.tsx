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
      <div>
          <div className="bg-white dark:bg-gray-800 absolute w-full h-[90px] bg-gray-800">
            
          </div>
          <div className="absolute">
            <Outlet />
          </div>
        <Footer />
      </div>
    </div>
  )
};

export default Layout;