import { useState, useContext, useEffect } from "react"
import InputBox from "../../components/InputBox"
import { FilterContext, Filter } from "../../context/FilterContext";
import { closeCircleOutline } from "ionicons/icons";
import { moveOutline } from "ionicons/icons";
import { IonIcon } from "@ionic/react";
import Button from "../../components/ImprovedButtonComponent";
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, PointerSensor, UniqueIdentifier, useSensor, useSensors } from "@dnd-kit/core"
import { SortableContext, arrayMove, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities"
import { filter } from "lodash";
import { createPortal } from "react-dom";





class KeywordBiasFilter extends Filter {
    
    constructor(keyword : string) {
        super(`Keyword Bias: ${keyword}`)
    }

}



class DummyFilter extends Filter {

    constructor(quantity : number) {
        if(quantity !== 0) {
            super("Years of Work Experience", quantity)
        }

        else {
            throw new RangeError("Quantity must be a positive integer.")
        }
    }

}





const FilterScreen = () => {

    const filterContext = useContext(FilterContext)





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

        const [keywordBias, setKeywordBias] = useState<string>("")



        const isDuplicateFilter = (filter : Filter) => {
            return filterContext.selectedFilters.some((filterObj) => filterObj.equals(filter))
        } 

        const isValidKeyword = (str : string) => {

            if(str) {
                return true
            }

            return false

        }



        return (
            <div className="flex flex-col flex-grow">
                <div className="flex-grow">
                    <Button
                        className="flex flex-col flex-shrink w-fit border-[0.1rem]"
                        onClick={
                            () => {

                                const dummyFilter : Filter = new DummyFilter(Math.floor(Math.random() * 9) + 1)

                                console.log(dummyFilter)

                                if(!isDuplicateFilter(dummyFilter)) {
                                    filterContext.setSelectedFilters([...filterContext.selectedFilters, dummyFilter])    
                                }

                            }
                        }
                    >
                        Click to add new filter
                    </Button>
                </div>
                <div className="flex flex-col flex-shrink">
                    <InputBox 
                            title={"Keyword Bias"} placeholder={"Full-stack Development"}
                            onSubmit={
                                (event) => {
                                    if(isValidKeyword(keywordBias)) {
                                        const keywordFilter : Filter = new KeywordBiasFilter(keywordBias)

                                        if(!isDuplicateFilter(keywordFilter)) {
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
            </div>
        )
    }





    const FilterLayerList = () => {

        const [activeFilter, setActiveFilter] = useState<Filter>()

        const sensors = useSensors(
            useSensor(PointerSensor, {
                activationConstraint: {
                    distance: 3
                }
            })
        )



        function onDragStart(event : DragStartEvent) {
            if(event.active.data.current?.type === "Column") {
                setActiveFilter(event.active.data.current.filter)
                return;
            }
            console.log(event)
        }

        function onDragEnd(event : DragEndEvent) {

            const { active, over } = event

            if(!over) return;

            const activeFilterId = active.id
            const overFilterId = over.id

            if(activeFilterId !== overFilterId) {
                filterContext.setSelectedFilters((filters) => {
                    const activeFilterIndex = filters.findIndex((filter) => filter.id === activeFilterId)

                    const overColumnIndex = filters.findIndex((filter) => filter.id === overFilterId)

                    return arrayMove(filters, activeFilterIndex, overColumnIndex)
                })
            }
            
        }





        return (
            <div 
            className="w-full h-full overflow-y-auto overflow-x-clip"
            >
                <div className="select-none absolute top-0 z-[10] w-full h-[2%] bg-[linear-gradient(0deg,rgba(0,0,0,0)_0%,white_70%)]" />
                <div className="flex flex-col h-full mr-[2rem]">
                    <div className="pb-[1.5rem]"/>
                    <DndContext onDragStart={onDragStart} onDragEnd={onDragEnd} sensors={sensors}>
                        <SortableContext items={filterContext.selectedFilters}>
                                <ol className="flex flex-grow flex-col">
                                    {filterContext.selectedFilters.map((filter, index) => (
                                        <FilterLayerCard key={filter.id} filter={filter}></FilterLayerCard>
                                    ))}
                                </ol>
                        </SortableContext>
                        {
                            createPortal(
                                (
                                    <DragOverlay>
                                        {activeFilter &&
                                            <FilterLayerCard key={activeFilter.id} filter={activeFilter}></FilterLayerCard>
                                        }
                                    </DragOverlay>
                                ),
                                document.body
                            )
                        }
                    </DndContext>
                    <div className="pb-[3rem]"/>
                </div>
                <div className="select-none absolute bottom-0 z-[10] w-full h-[5%] bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,white_70%)]" />
            </div>
        )
    }



    const FilterLayerCard = (props: {key : UniqueIdentifier, filter : Filter}) => {

        const { setNodeRef, attributes, listeners, transform, transition } = useSortable({
            id: props.filter.id,
            data: {
                type: "Filter",
                filter
            }
        })

        const style = {
            transition,
            transform: CSS.Transform.toString(transform)
        }




        
        function handleXClicked() {

            const temp = [...filterContext.selectedFilters].filter((filter) => {return filter !== props.filter})
                                
            filterContext.setSelectedFilters(temp)
            
        }





        return (
            <div 
                style={style}
                ref={setNodeRef}
            >
                <div 
                    className=" bg-red dark:bg-gray rounded-tr-[1rem] rounded-br-[3rem]
                                py-[0.7rem] flex flex-row leading-[1.4rem] gap-[1rem] pl-[1.5rem] mb-[1rem] justify-between pr-[2.5rem]">
                    <div className="flex flex-col justify-center text-[1.2rem] overflow-wrap">
                        {`${props.filter.quantity ? props.filter.quantity : ""} ${props.filter.description}`}
                    </div>
                    <div className="select-none flex flex-row gap-[0.7rem]">
                        <IonIcon
                            className="cursor-pointer text-[2rem]" icon={closeCircleOutline}
                            onClick={handleXClicked}
                        />
                        <IonIcon
                            className="cursor-pointer text-[2rem]" icon={moveOutline}
                            {...attributes}
                            {...listeners}
                        />
                    </div>
                </div>
            </div>

        )
    }





    const FilterLayerColumn = () => {

        return (
            <div className="flex flex-col min-w-[17rem] w-[40vw]">
                <div
                    className="flex flex-shrink bg-[gray] dark:bg-blue text-[2.2rem] p-[1rem] mb-[1rem] rounded-tr-[3rem] rounded-br-[3rem] overflow-wrap"
                >
                    Find your desired candidates.
                </div>
                <div
                    className="flex flex-shrink bg-[gray] dark:bg-blue text-[1.4rem] p-[1rem] mb-0.5 rounded-tr-[3rem] rounded-br-[3rem] overflow-wrap"
                >
                    Current Filter Layers:
                </div>
                <div className="relative flex flex-grow overflow-clip">
                    <FilterLayerList></FilterLayerList> 
                </div>
            </div>
        )
    }



    const AddFiltersColumn = () => {

        return (
            <div className="bg-[gray] dark:bg-blue
                            flex flex-col flex-grow rounded-tl-[10rem] px-[3rem] pt-[1rem] pb-[3rem]">
                <div className="self-center text-[5rem]">Filters</div>
                <FilterLayerOptions></FilterLayerOptions>
            </div>
        )
    }





    return (
        <div className="flex h-full flex-row space-x-[2rem]">
            <FilterLayerColumn />
            <AddFiltersColumn />
        </div>
    )

}


export default FilterScreen