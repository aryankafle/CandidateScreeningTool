import { useContext, useEffect } from "react"
import { FileContext } from "../../context/FileContext"
import HeaderButtons from "../../components/FilterScreenHeaderButtons"
import InputBox from "../../components/InputBox"
import { FilterContext, Filter } from "../../context/FilterContext";
import { closeCircleOutline } from "ionicons/icons";
import { moveOutline } from "ionicons/icons";
import { IonIcon } from "@ionic/react";





class KeywordBiasFilter extends Filter {
    
    constructor(keyword : string) {
        super("Keyword Bias", `Keyword Bias: ${keyword}`)
    }

}



class DummyFilter extends Filter {

    constructor(quantity : number) {
        super("Work Experience", "Years of Work Experience", quantity)
    }

}





const FilterScreen = () => {

    const fileContext = useContext(FileContext)
    const filterContext = useContext(FilterContext)


    useEffect(() => {
        filterContext.setSelectedFilters([
            new DummyFilter(4),
            new DummyFilter(5)
        ])
    }, [])


    const FilterLayerOptions = () => {

        return (
            <div className="flex-grow flex flex-col">
                filter options
            </div>
        )
    }





    const FilterLayerList = () => {

        return (
            <div className="flex flex-grow flex-col overflow-auto select-none">
                <ol>
                    {filterContext.selectedFilters.map((filter) => (
                        <FilterLayerCard filter={filter}></FilterLayerCard>
                    ))}
                </ol>
            </div>
        )
    }



    const FilterLayerCard = (props: {filter : Filter}) => {

        return (
            <div className="bg-red dark:bg-gray rounded-tr-[1rem] rounded-br-[3rem]
                            py-[0.7rem] flex flex-row leading-[1.4rem] gap-[1rem] flex-grow pl-[1.5rem] mb-[0.6rem] justify-between pr-[2.5rem]">
                <div className="flex flex-col justify-center text-[1.2rem] overflow-wrap">
                    {`${props.filter.quantity ? props.filter.quantity : ""} ${props.filter.description}`}
                </div>
                <div className="flex flex-row gap-[0.7rem]">
                    <IonIcon
                        className="cursor-pointer text-[2rem]" icon={closeCircleOutline}
                        onClick={() => {}}
                    />
                    <IonIcon 
                        className="cursor-pointer text-[2rem]" icon={moveOutline}
                        onClick={() => {}}
                    />
                </div>
            </div>
        )
    }





    const FilterLayerColumn = () => {

        return (
            <div className="flex flex-col gap-[2rem] w-[40vw] max-w-[40rem]">
                <div
                    className="bg-[gray] dark:bg-blue text-[2.5rem] p-[1rem] rounded-tr-[3rem] rounded-br-[3rem] overflow-y-clip overflow-x-auto"
                >
                    Find your desired candidates.
                </div>
                <div
                    className="bg-[gray] dark:bg-blue text-[1.8rem] p-[1rem] rounded-tr-[3rem] rounded-br-[3rem] overflow-y-clip overflow-x-auto"
                >
                    Current Filter Layers:
                </div>
                <FilterLayerList></FilterLayerList> 
            </div>
        )
    }



    const AddFiltersColumn = () => {

        return (
            <div className="bg-[gray] dark:bg-blue
                            flex flex-col flex-grow rounded-tl-[10rem] px-[3rem] pt-[1rem] pb-[3rem]">
                <div className="self-center text-[5rem]">Filters</div>
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