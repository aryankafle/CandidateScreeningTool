import { Outlet } from "react-router-dom";
import Footer from '../components/FooterComponent'
import Header from '../components/HeaderComponent'
import Background from '../components/BackgroundComponent'

/*
This component is rendered on all routes.
*/

const DecoratedLayout = () => {
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

export default DecoratedLayout;