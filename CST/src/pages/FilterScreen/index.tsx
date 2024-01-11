import { useContext } from "react"
import { FileContext } from "../../context/FileContext"
import HeaderButtons from "../../components/FilterScreenHeaderButtons"





const FilterScreen = () => {

    const fileContext = useContext(FileContext)





    const FilterLayerColumn = () => {

        return <div className="w-[40vw] max-w-[40rem] border-[5px]">
           asdf 
        </div>
    }

    const AddFiltersColumn = () => {

        return <div className="flex-grow border-[5px]">
            asdf
        </div>
    }



    return (
        <div className="w-screen flex flex-col min-h-[20rem] overflow-auto">
            <HeaderButtons />
            <div className="justify-between gap-[1rem] flex-grow flex flex-row">
                <FilterLayerColumn />
                <AddFiltersColumn />
            </div>
        </div>
    )

}


export default FilterScreen