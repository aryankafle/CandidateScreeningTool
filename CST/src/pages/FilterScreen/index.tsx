import { useState, useContext, useMemo, useEffect } from 'react';
import InputBox from "../../components/forms/InputBox"
import { FilterContext } from "../../context/FilterContext";
import { Filter } from "../../utils/Filter"
import { closeCircleOutline } from "ionicons/icons";
import { IonIcon } from "@ionic/react";
import Button from "../../components/buttons/ImprovedButtonComponent";
import React from 'react';
import DraggableList from '../../components/views/DraggableList/';
import { FileContext } from '../../context/FileContext';
import { SelectionContext } from '../../context/SelectionContext';
import { FlagContext } from '../../context/FlagContext';
import Modal from '../../components/modals/Modal';





class KeywordBiasFilter extends Filter {

    constructor(keyword : string) {
        super(
            `Keyword Bias: ${keyword}`,
            `How well does the file include the keyword: ${keyword}, or similar keywords? Similar keywords are less important than original keyword, so weight them into your answer less based on how far they are from the original keyword.`,
        )
    }

}



class WorkFilter extends Filter {

    constructor(quantity : number) {
        if(quantity !== 0) {
            super("Years of Work Experience: 5+", "Does this file have 5+ years of work experience?", quantity)
        }

        else {
            throw new RangeError("Quantity must be a positive integer.")
        }
    }

}

class DegreeFilter extends Filter {

    constructor(quantity : number) {
        if(quantity !== 0) {
            super("Level of Degree: Masters", "Does this file have at least a masters degree?", quantity)
        }

        else {
            throw new RangeError("Quantity must be a positive integer.")
        }
    }

}

class IsResumeFilter extends Filter {

    constructor(quantity : number) {
        if(quantity !== 0) {
            super("File is a resume", "Is this file a resume?", quantity)
        }

        else {
            throw new RangeError("Quantity must be a positive integer.")
        }
    }

}





const FilterScreen = () => {

    const filterContext = useContext(FilterContext)

    const [filterList, setFilterList] = useMemo(() => [filterContext.selectedFilters, filterContext.setSelectedFilters], [filterContext])

    const fileContext = useContext(FileContext)

    const { previouslySelectedFilters } = useContext(SelectionContext)

    const { filtersChanged, setFiltersChanged } = useContext(FlagContext)

    const { loadingState, setLoadingState } = useContext(FlagContext)

    const { filtersApplied, setFiltersApplied } = useContext(FlagContext)

    setLoadingState(false)

    if (!fileContext.uploadedFiles) {
        throw('No files uploaded')
    } else if (fileContext.currentBatchName == "") {
        throw('No batch name created')
    }


    useEffect(() => {
        
        if (filterList.length !== previouslySelectedFilters.length) {
            setFiltersChanged(true)
            return;
        }

        if (filterList.some((filter) => !previouslySelectedFilters.includes(filter))) {
            setFiltersChanged(true)
            return;
        }



        setFiltersChanged(false)
    
    }, [filterList])



    useEffect(() => {
        setLoadingState(filtersApplied)
    }, [filtersApplied])



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

                                const workFilter : Filter = new WorkFilter(Math.floor(Math.random() * 99999999999) + 1)

                                console.log("Dumb Filter: ", workFilter)

                                if(!isDuplicateFilter(workFilter)) {
                                    setFilterList([...filterList, workFilter])    
                                }

                            }
                        }
                    >
                        Click to add new work experience filter
                    </Button>


                    <Button
                        className="flex flex-col flex-shrink w-fit border-[0.1rem]"
                        onClick={
                            () => {

                                const degreeFilter : Filter = new DegreeFilter(Math.floor(Math.random() * 99999999999) + 1)

                                console.log("Dumb Filter: ", degreeFilter)

                                if(!isDuplicateFilter(degreeFilter)) {
                                    setFilterList([...filterList, degreeFilter])    
                                }

                            }
                        }
                    >
                        Click to add new education degree filter
                    </Button>


                    <Button
                        className="flex flex-col flex-shrink w-fit border-[0.1rem]"
                        onClick={
                            () => {

                                const isResumeFilter : Filter = new IsResumeFilter(Math.floor(Math.random() * 99999999999) + 1)

                                console.log("Dumb Filter: ", isResumeFilter)

                                if(!isDuplicateFilter(isResumeFilter)) {
                                    setFilterList([...filterList, isResumeFilter])    
                                }

                            }
                        }
                    >
                        Click to add new resume filter
                    </Button>
                </div>
                <div className="flex flex-col flex-shrink">
                    <InputBox 
                            title={"Keyword Bias"} placeholder={"Full-stack Development"}
                            onSubmit={
                                () => {
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
                            value={keywordBias}
                            errorFunction={(string) => {return ""}
                        }
                    />
                </div>
            </div>
        )
    }

    

    const FilterLayerCard = (props: {item : Filter, isDragging : boolean}) => {

        function handleXClicked() {

            const temp = [...filterList].filter((filter) => {return filter !== props.item})
            
            setFilterList(temp)
            
        }



        return props.isDragging ? 
                <div 
                    className=" bg-green dark:bg-red rounded-tr-[1rem] rounded-br-[3rem]
                                py-[0.7rem] flex flex-row leading-[1.4rem] gap-[1rem] pl-[1.5rem] mb-[1rem] justify-between pr-[2.5rem]">
                    <div className="h-[3rem] pr-[0.1rem] overflow-y-auto">
                        {/* {`${props.item.quantity ? props.item.quantity : ""} ${props.item.description}`} */
                        `${props.item.description}`}
                    </div>
                    <IonIcon
                        className="cursor-pointer text-[2rem]" icon={closeCircleOutline}
                        onClick={handleXClicked}
                    />
                </div>
            :
                <div 
                    className=" bg-red dark:bg-blueLight rounded-tr-[1rem] rounded-br-[3rem]
                                py-[0.7rem] flex flex-row leading-[1.4rem] gap-[1rem] pl-[1.5rem] mb-[1rem] justify-between pr-[2.5rem]">
                    <div className="h-[3rem] pr-[0.1rem] overflow-y-auto">
                        {/* {`${props.item.quantity ? props.item.quantity : ""} ${props.item.description}`} */
                         `${props.item.description}`}
                    </div>
                    <IonIcon
                        className="cursor-pointer text-[2rem] hover:text-redS" icon={closeCircleOutline}
                        onClick={handleXClicked}
                    />
                </div>
    }





    return (
        <div className="overflow-y-auto overflow-x-clip flex h-full w-full flex-row space-x-[2rem]">
            {filtersApplied && 
                <Modal modalTrigger={loadingState} onClose={()=>{setLoadingState(false)}}>
                    {/* <CandidateDescriptionPopup /> */}
                </Modal>
            }
            <div className="flex flex-col h-full min-w-[17rem] w-[40vw]">
                <div className='sticky flex flex-col z-[1] top-0'>
                    <div
                        className="flex flex-shrink bg-[gray] dark:bg-blueDark text-[2.2rem] p-[1rem] mb-[1rem] rounded-tr-[3rem] rounded-br-[3rem]"
                    >
                        Find your desired candidates.
                    </div>
                    <div
                        className="flex flex-shrink bg-[gray] dark:bg-blueDark text-[1.4rem] p-[1rem] mb-0.5 rounded-tr-[3rem] rounded-br-[3rem]"
                    >
                        Current Filter Layers:
                    </div>
                </div>
                <div className="flex flex-col select-none">
                    <div className="pb-[1.5rem]"/>
                    <DraggableList
                        uniqueIDItems={filterList}
                        setUniqueIDItems={setFilterList}
                        ItemCard={FilterLayerCard}
                        className="flex flex-grow flex-col"
                    />
                    <div className="pb-[3rem]"/>
                </div>
            </div>
            <div className='sticky top-0 flex flex-grow'>
                <div className="bg-[gray] dark:bg-blueDark
                                flex flex-col flex-grow rounded-tl-[10rem] px-[3rem] pt-[1rem] pb-[3rem]">
                    <div className="self-center text-[5rem]">Filters</div>
                    <FilterLayerOptions />
                </div>
            </div> 
        </div>
    )

}


export default FilterScreen