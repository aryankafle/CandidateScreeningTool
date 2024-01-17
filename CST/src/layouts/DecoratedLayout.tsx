import { Outlet } from "react-router-dom";
import Footer from '../components/FooterComponent'
import Header from '../components/HeaderComponent'
import Background from '../components/BackgroundComponent'
import Root from '../components/LayoutRootComponent'





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