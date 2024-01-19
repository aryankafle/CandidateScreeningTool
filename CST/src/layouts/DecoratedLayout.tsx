import { Outlet } from "react-router-dom";
import Footer from '../components/UI/FooterComponent'
import Header from '../components/UI/HeaderComponent'
import Background from '../components/UI/BackgroundComponent'
import Root from '../components/UI/LayoutRootComponent'





const DecoratedLayout = () => {
  return (
    <Root>
      <Background />
      <Header />
      <Outlet />
      <Footer />
    </Root>
  )
};

export default DecoratedLayout;