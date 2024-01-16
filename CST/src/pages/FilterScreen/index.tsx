import { useState, useRef, useContext, useEffect } from "react"
import HeaderButtons from "../../components/FilterScreenHeaderButtons"
import InputBox from "../../components/InputBox"
import { FilterContext, Filter } from "../../context/FilterContext";
import { closeCircleOutline } from "ionicons/icons";
import { moveOutline } from "ionicons/icons";
import { IonIcon } from "@ionic/react";
import Button from "../../components/ImprovedButtonComponent";





class KeywordBiasFilter extends Filter {
    
    constructor(keyword : string) {
        super("Keyword Bias", `Keyword Bias: ${keyword}`)
    }

}



class DummyFilter extends Filter {

    constructor(quantity : number) {
        if(quantity !== 0) {
            super("Work Experience", "Years of Work Experience", quantity)
        }

        else {
            throw new RangeError("Quantity must be a positive integer.")
        }
    }

}





const FilterScreen = () => {

    const filterContext = useContext(FilterContext)



    const draggedFilter = useRef<number>(0)
    const draggedOverFilter = useRef<number>(0)





    useEffect(() => {
        filterContext.setSelectedFilters([
            new DummyFilter(4),
            new DummyFilter(5),
            new DummyFilter(6),
            new DummyFilter(8),
            new DummyFilter(1)
        ])
    }, [])



    

    const FilterLayerOptions = () => {

        return (
            <div className="flex-grow flex flex-col">
                <Button
                    className="flex flex-col flex-shrink w-fit border-[0.1rem]"
                    onClick={
                        () => {
                            filterContext.setSelectedFilters([...filterContext.selectedFilters, new DummyFilter(Math.floor(Math.random() * 9) + 1)])
                        }
                    }
                >
                    Click to add new filter
                </Button>
            </div>
        )
    }





    const FilterLayerList = () => {

        return (
            <div className="flex flex-grow flex-col overflow-auto select-none">
                <ol>
                    {filterContext.selectedFilters.map((filter, index) => (
                        <FilterLayerCard filter={filter} index={index}></FilterLayerCard>
                    ))}
                </ol>
            </div>
        )
    }



    const FilterLayerCard = (props: {filter : Filter, index : number}) => {

        function handleXClicked() {

            const temp = [...filterContext.selectedFilters].filter((filter) => {return filter !== props.filter})
                                
            filterContext.setSelectedFilters(temp)
            
        }






        const handleDragStart : React.DragEventHandler<HTMLIonIconElement> = (event) => {
            
            draggedFilter.current = props.index

        }

        const handleDragEnter : React.DragEventHandler<HTMLIonIconElement> = (event) => {
            
            draggedOverFilter.current = props.index

        }

        const handleDragEnd : React.DragEventHandler<HTMLIonIconElement> = (event) => {

            const tempFilters = [...filterContext.selectedFilters]
            const swappingFilter = tempFilters[draggedFilter.current]

            tempFilters[draggedFilter.current] = tempFilters[draggedOverFilter.current]
            tempFilters[draggedOverFilter.current] = swappingFilter

            filterContext.setSelectedFilters(tempFilters)

        }

        const handleDragOver : React.DragEventHandler<HTMLIonIconElement> = (event) => {
            event.preventDefault()
        }





        return (
            <div draggable className="bg-red dark:bg-gray rounded-tr-[1rem] rounded-br-[3rem]
                            py-[0.7rem] flex flex-row leading-[1.4rem] gap-[1rem] flex-grow pl-[1.5rem] mb-[0.6rem] justify-between pr-[2.5rem]">
                <div className="flex flex-col justify-center text-[1.2rem] overflow-wrap">
                    {`${props.filter.quantity ? props.filter.quantity : ""} ${props.filter.description}`}
                </div>
                <div className="flex flex-row gap-[0.7rem]">
                    <IonIcon
                        className="cursor-pointer text-[2rem]" icon={closeCircleOutline}
                        onClick={handleXClicked}
                    />
                    <IonIcon
                        draggable
                        onDragStart={handleDragStart}
                        onDragEnter={handleDragEnter}
                        onDragEnd={handleDragEnd}
                        onDragOver={handleDragOver}
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

        const [keywordBias, setKeywordBias] = useState("")

        function checkIfValidKeyword(str : string) {

            if(str) {
                return true
            }

            return false

        }

        return (
            <div className="bg-[gray] dark:bg-blue
                            flex flex-col flex-grow rounded-tl-[10rem] px-[3rem] pt-[1rem] pb-[3rem]">
                <div className="self-center text-[5rem]">Filters</div>
                <FilterLayerOptions></FilterLayerOptions>
                <InputBox 
                        title={"Keyword Bias"} placeholder={"Full-stack Development"}
                        onSubmit={
                            (event) => {
                                if(checkIfValidKeyword(keywordBias)) {
                                    const keywordFilter : Filter = new KeywordBiasFilter(keywordBias)

                                    if(!filterContext.selectedFilters.some((filter) => filter.equals(keywordFilter))) {
                                        filterContext.setSelectedFilters([...filterContext.selectedFilters, keywordFilter])
                                    }
                                }
                            }
                        }
                        onChange={
                            (event) => {
                                setKeywordBias(event.target.value)
                            }
                        }
                        errorFunction={(string) => {return ""}
                    }
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