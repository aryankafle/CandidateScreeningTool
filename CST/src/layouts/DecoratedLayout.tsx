import { Outlet } from "react-router-dom";
import Footer from '../components/FooterComponent'
import Header from '../components/HeaderComponent'
import Background from '../components/BackgroundComponent'
import Root from '../components/LayoutRootComponent'

/*
This component is rendered on all routes.
*/

const DecoratedLayout = () => {
  return (
    <>
      <Root>
        <Header />
        <div className="flex flex-col flex-grow">
          <div className="w-full absolute z-[-1]">
            <Background />
          </div>
          <div className="flex flex-grow border-red border-[0.2rem]">
            <Outlet />
          </div>
          <Footer />
        </div>
      </Root>
    </>
  )
};

export default DecoratedLayout;