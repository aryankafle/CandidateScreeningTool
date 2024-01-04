import { Outlet } from "react-router-dom";
import Footer from '../components/FooterComponent'
import Header from '../components/HeaderComponent'
import Root from '../components/LayoutRootComponent'

/*
This component is rendered on all routes.
*/

const Layout = () => {
  return (
    <Root>
      <Header /> 
        <div className="flex flex-grow border-red border-[0.2rem]">
          <Outlet />
        </div>
      <Footer />
    </Root>
  )
};

export default Layout;