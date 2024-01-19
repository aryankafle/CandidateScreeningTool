import { Outlet } from "react-router-dom"
import Header from '../components/UI/HeaderComponent'
import Footer from '../components/UI/FooterComponent'
import NavBar from "../components/UI/HomeScreenNavBar"
import Root from "../components/UI/LayoutRootComponent"





const HomeLayout = () => {
    return (
        <Root>
            <Header />
            <div className="flex flex-col flex-shrink">
                <NavBar />
            </div>
            <div className="flex flex-col flex-grow overflow-auto">
                <Outlet />
            </div>
            <Footer />
        </Root>
        
    )
}

export default HomeLayout