import { ChangeEvent, useContext } from "react"
import { FileContext } from "../../context/FileContext"
import HeaderButtons from "../../components/FilterScreenHeaderButtons"
import InputBox from "../../components/InputBox"





const FilterScreen = () => {

    const fileContext = useContext(FileContext)





    const FilterLayerOptions = () => {

        return (
            <div>
                filter options
            </div>
        )
    }



    const FilterLayerList = () => {

        return (
            <div>
                filter list
            </div>
        )
    }



    const FilterLayerColumn = () => {

        return (
            <div className="w-[40vw] max-w-[40rem] border-[5px]">
                <div>Find your desired candidates.</div>
                <div>Current Filter Layers:</div>
                <FilterLayerList></FilterLayerList> 
            </div>
        )
    }

    const AddFiltersColumn = () => {

        return (
            <div className="flex-grow border-[5px]">
                <div>Filters</div>
                <FilterLayerOptions></FilterLayerOptions>
                <InputBox 
                        title={"Keyword Bias"} placeholder={"Full-stack Development"}
                        onChange={() => {}}
                        errorFunction={(string) => {return ""}}
                />
            </div>
        )
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