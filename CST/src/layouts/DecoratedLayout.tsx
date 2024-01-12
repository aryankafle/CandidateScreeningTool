import { Outlet } from "react-router-dom";
import Footer from '../components/FooterComponent'
import Header from '../components/HeaderComponent'
import Background from '../components/BackgroundComponent'
import Root from '../components/LayoutRootComponent'

const DecoratedLayout = () => {
  return (
    <>
      <Root>
        <div className="w-full absolute z-[-1]">
          <Background />
        </div>
        <Header />
        <div className="flex flex-col flex-grow">
          <div className="flex flex-grow">
            <Outlet />
          </div>
          <Footer />
        </div>
      </Root>
    </>
  )
};

export default DecoratedLayout;