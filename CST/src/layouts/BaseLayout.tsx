import { Outlet } from "react-router-dom";
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
          <div className="absolute">
            <Outlet />
          </div>
        <Footer />
      </div>
    </div>
  )
};

export default Layout;