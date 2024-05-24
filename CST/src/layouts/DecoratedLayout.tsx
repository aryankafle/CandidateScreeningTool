import { Outlet } from "react-router-dom";
import Header from '../components/UI/HeaderComponent'
import Background from '../components/UI/BackgroundComponent'
import Root from '../components/UI/LayoutRootComponent'





const DecoratedLayout = () => {
  return (
    <Root>
      <Background />
      <Header />
      <Outlet />
    </Root>
  )
};

export default DecoratedLayout;