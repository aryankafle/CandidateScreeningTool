import { Outlet } from "react-router-dom"
import Header from '../components/HeaderComponent'
import Footer from '../components/FooterComponent'
import NavBar from "../components/HomeScreenNavBar"
import Root from "../components/LayoutRootComponent"

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