import { Outlet } from "react-router-dom";
import Footer from '../components/UI/FooterComponent'
import Header from '../components/UI/HeaderComponent'
import Root from '../components/UI/LayoutRootComponent'





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