import { Outlet } from "react-router-dom"
import Header from '../components/HeaderComponent'
import Footer from '../components/FooterComponent'
import NavBar from "../components/HomeScreenNavBar"
import Root from "../components/LayoutRootComponent"

const HomeLayout = () => {
    return (
        <Root>
            <Header />
            <NavBar />
            <div className="flex flex-grow">
                <Outlet />
            </div>
            <Footer />
        </Root>
        
    )
}

export default HomeLayout