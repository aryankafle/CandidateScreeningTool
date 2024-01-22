import { useState, useContext, useMemo } from 'react';
import InputBox from "../../components/forms/InputBox"
import { FilterContext, Filter } from "../../context/FilterContext";
import { closeCircleOutline } from "ionicons/icons";
import { moveOutline } from "ionicons/icons";
import { IonIcon } from "@ionic/react";
import Button from "../../components/buttons/ImprovedButtonComponent";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities"
import React from 'react';
import DraggableListWrapper from '../../components/views/DraggableList/';





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

    const [filterList, setFilterList] = useMemo(() => [filterContext.selectedFilters, filterContext.setSelectedFilters], [filterContext])





    const FilterLayerOptions = () => {

        const [keywordBias, setKeywordBias] = useState<string>("")



        const isDuplicateFilter = (filter : Filter) => {
            return filterList.some((filterObj) => filterObj.equals(filter))
        } 

        const isValidKeyword = (str : string) => {

            if(str) {
                return true
            }

            return false

        }



        return (
            <div className="flex flex-col flex-grow">
                <div className="flex-grow overflow-auto">
                    <Button
                        className="flex flex-col flex-shrink w-fit border-[0.1rem]"
                        onClick={
                            () => {

                                const dummyFilter : Filter = new DummyFilter(Math.floor(Math.random() * 99999999999) + 1)

                                console.log("Dumb Filter: ", dummyFilter)

                                if(!isDuplicateFilter(dummyFilter)) {
                                    setFilterList([...filterList, dummyFilter])    
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
                                            setFilterList([...filterList, keywordFilter])
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





    const FilterLayerCard = (props: {filter : Filter}) => {

        function handleXClicked() {

            const temp = [...filterList].filter((filter) => {return filter !== props.filter})
                                
            setFilterList(temp)
            
        }





        const { setNodeRef, attributes, listeners, transform, transition, isDragging} = useSortable({
            id: props.filter.id,
            data: {
                type: "Item",
                item: props.filter
            }
        })



        const style = {
            transition,
            transform: CSS.Transform.toString(transform)
        }




        
        if(isDragging) {
            return (
                <div 
                    style={style}
                    ref={setNodeRef}
                >
                    <div className="bg-green dark:bg-red rounded-tr-[1rem] rounded-br-[3rem]
                                    py-[0.7rem] flex flex-row leading-[1.4rem] gap-[1rem] pl-[1.5rem] mb-[1rem] justify-between pr-[2.5rem]">
                        <div className="h-[3rem] pr-[0.1rem] overflow-y-auto">
                            {`${props.filter.quantity ? props.filter.quantity : ""} ${props.filter.description}`}
                        </div>
                        <div className="flex flex-row gap-[0.7rem]">
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
        else {
            return (
                <div 
                    style={style}
                    ref={setNodeRef}
                >
                    <div 
                        className=" bg-red dark:bg-green rounded-tr-[1rem] rounded-br-[3rem]
                                    py-[0.7rem] flex flex-row leading-[1.4rem] gap-[1rem] pl-[1.5rem] mb-[1rem] justify-between pr-[2.5rem]">
                        <div className="h-[3rem] pr-[0.1rem] overflow-y-auto">
                            <h3 className=''>
                                {`${props.filter.quantity ? props.filter.quantity : ""} ${props.filter.description}`}
                            </h3>
                        </div>
                        <div className="flex flex-row gap-[0.7rem]">
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
    }





    return (
        <div className="overflow-y-auto overflow-x-clip flex h-full w-full flex-row space-x-[2rem]">
            <div className="flex flex-col h-full min-w-[17rem] w-[40vw]">
                <div className='sticky flex flex-col z-[1] top-0'>
                    <div
                        className="flex flex-shrink bg-[gray] dark:bg-blue text-[2.2rem] p-[1rem] mb-[1rem] rounded-tr-[3rem] rounded-br-[3rem]"
                    >
                        Find your desired candidates.
                    </div>
                    <div
                        className="flex flex-shrink bg-[gray] dark:bg-blue text-[1.4rem] p-[1rem] mb-0.5 rounded-tr-[3rem] rounded-br-[3rem]"
                    >
                        Current Filter Layers:
                    </div>
                </div>
                <div className="flex flex-col select-none">
                    <div className="pb-[1.5rem]"/>
                        <DraggableListWrapper
                            uniqueIDItems={filterList}
                            setUniqueIDItems={setFilterList}
                        >
                            <ol className="flex flex-grow flex-col">
                                {filterList.map((filter) => (
                                    <FilterLayerCard key={filter.id} filter={filter} />
                                ))}
                            </ol>
                        </DraggableListWrapper>
                    <div className="pb-[3rem]"/>
                </div>
            </div>
            <div className='sticky top-0 flex flex-grow'>
                <div className="bg-[gray] dark:bg-blue
                                flex flex-col flex-grow rounded-tl-[10rem] px-[3rem] pt-[1rem] pb-[3rem]">
                    <div className="self-center text-[5rem]">Filters</div>
                    <FilterLayerOptions></FilterLayerOptions>
                </div>
            </div> 
        </div>
    )

}


export default FilterScreen