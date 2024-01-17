import { Outlet } from "react-router-dom";
import Footer from '../components/FooterComponent'
import Header from '../components/HeaderComponent'
import Root from '../components/LayoutRootComponent'





const Layout = () => {
  return (
    <Root>
      <Header /> 
      <div className="flex flex-grow">
        <Outlet />
      </div>
      <Footer />
    </Root>
  )
};

export default Layout;