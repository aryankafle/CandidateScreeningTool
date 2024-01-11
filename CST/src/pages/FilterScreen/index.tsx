import { useContext } from "react"
import { FileContext } from "../../context/FileContext"
import HeaderButtons from "../../components/FilterScreenHeaderButtons"

const FilterScreen = () => {
    const fileContext = useContext(FileContext)

    return (
        <div className="w-screen">
            <HeaderButtons />
        </div>
        
        
        
    )
}
export default FilterScreen