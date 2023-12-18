import { Outlet, Link } from "react-router-dom";
import Footer from '../components/FooterComponent'
import Header from '../components/HeaderComponent'
import Background from '../components/BackgroundComponent'

/*
This component is rendered on all routes.
*/

const Layout = () => {
  return (
    <div>
      <Header />
      <div>
          <div className="w-full absolute">
            <Background />
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