import { Outlet } from "react-router-dom";
import Header from '../components/UI/HeaderComponent'
import Root from '../components/UI/LayoutRootComponent'





const Layout = () => {
  return (
    <Root>
      <Header /> 
      <Outlet />
    </Root>
  )
};

export default Layout;