import { Outlet } from "react-router-dom";
import Header from '../components/UI/HeaderComponent';
import Root from '../components/layout/LayoutRootComponent';





const Layout = () => {
  return (
    <Root>
      <Header /> 
      <Outlet />
    </Root>
  )
};

export default Layout;