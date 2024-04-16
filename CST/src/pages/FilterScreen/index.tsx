import { useState, useContext, useEffect } from 'react';
import InputBox from "../../components/forms/InputBox"
import { Filter } from '../../utils/Filter';
import { closeCircleOutline } from "ionicons/icons";
import { IonIcon } from "@ionic/react";
import Button from "../../components/buttons/ImprovedButtonComponent";
import React from 'react';
import DraggableList from '../../components/views/DraggableList/';
import { SelectionContext } from '../../context/SelectionContext';
import { FlagContext } from '../../context/FlagContext';
import Modal from '../../components/modals/Modal';





class KeywordBiasFilter extends Filter {

    constructor(keyword : string) {
        super(
            `Keyword Bias: ${keyword}`,
            `The resume should contain the word or phrase: "${keyword}".`,
        )
    }

}



class YearsOfWorkExperienceFilter extends Filter {

    constructor(quantity : number) {
        if(quantity !== 0) {
            super(
                `Years of Work Experience: ${quantity}`, 
                `The resume should indicate or strongly imply that the applicant has ${quantity} or more years of professional work experience.`,
                quantity
            )
        }

        else {

            throw new RangeError("Quantity must be a positive integer.")

        }
    }

}

class HasDegreeFilter extends Filter {

    constructor() {

        super("Resume Mentions Collegiate Degree", "The resume must show that the applicant is a COLLEGE GRADUATE and ALREADY HAS a collegiate level degree. This must be expliclity stated. Give a score of 0 if they attend high school.")
    
    }

}

class HasWorkExperienceFilter extends Filter {

    constructor() {
        
        super("Resume Contains Work Experience", "The resume should contain professional work experience.")

    }

}





const FilterScreen = () => {

    const { selectedFilters, setSelectedFilters } = useContext(SelectionContext)

    const { previouslySelectedFilters } = useContext(SelectionContext)

    const { updateFlag } = useContext(FlagContext)

    const { loadingState, setLoadingState } = useContext(FlagContext)





    useEffect(() => {
        
        if (selectedFilters.length !== previouslySelectedFilters.length) {

            updateFlag({flag: 'filters have changed', action: 'activate'})
            return;

        }

        for(let i = 0; i < selectedFilters.length; i++) {

            if(selectedFilters[i].id !== previouslySelectedFilters[i].id) {

                updateFlag({flag: 'filters have changed', action: 'activate'})
                return;
            }

        }



        updateFlag({flag: 'filters have changed', action: 'deactivate'})
    
    }, [selectedFilters, previouslySelectedFilters, updateFlag])





    const FilterLayerOptions = () => {

        const [keywordBias, setKeywordBias] = useState<string>("")



        const isDuplicateFilter = (filter : Filter) => {
            return selectedFilters.some((filterObj) => filterObj.equals(filter))
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

                                const YearsOfWorkFilter : Filter = new YearsOfWorkExperienceFilter(5)

                                if(!isDuplicateFilter(YearsOfWorkFilter)) {
                                    setSelectedFilters((filters) => [...filters, YearsOfWorkFilter])    
                                }

                            }
                        }
                    >
                        Click to add a new 5+ years work experience filter
                    </Button>


                    <Button
                        className="flex flex-col flex-shrink w-fit border-[0.1rem]"
                        onClick={
                            () => {

                                const DegreeFilter : Filter = new HasDegreeFilter()

                                if(!isDuplicateFilter(DegreeFilter)) {
                                    setSelectedFilters((filters) => [...filters, DegreeFilter])    
                                }

                            }
                        }
                    >
                        Click to add new has college degree filter
                    </Button>


                    <Button
                        className="flex flex-col flex-shrink w-fit border-[0.1rem]"
                        onClick={
                            () => {

                                const HasWorkExperience : Filter = new HasWorkExperienceFilter()

                                if(!isDuplicateFilter(HasWorkExperience)) {
                                    setSelectedFilters((filters) => [...filters, HasWorkExperience])    
                                }

                            }
                        }
                    >
                        Click to add new has work experience filter
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
                                            setSelectedFilters((filters) => [...filters, keywordFilter])    
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

            const temp = [...selectedFilters].filter((filter) => {return filter !== props.item})
            
            setSelectedFilters(temp)
            
        }



        return props.isDragging ? 
                <div 
                    className=" bg-red dark:bg-grayDark/40 flex flex-row rounded-md
                                gap-[1rem] mb-[1rem] p-[2rem] text-3xl text-white justify-between">
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
                    className=" bg-red dark:bg-grayDark flex flex-row rounded-md
                                gap-[1rem] mb-[1rem] p-[2rem] text-3xl text-white justify-between">
                    <div className="">
                        {/* {`${props.item.quantity ? props.item.quantity : ""} ${props.item.description}`} */
                         `${props.item.description}`}
                    </div>
                    <IonIcon
                        className="flex flex-col cursor-pointer text-[2rem] hover:text-redS" icon={closeCircleOutline}
                        onClick={handleXClicked}
                    />
                </div>
    }


    const FilterLoadingPanel = () => {
        return(
            <div className="bg-white dark:bg-grayDark
                            flex flex-col self-center text-3xl">
                <div className="flex justify-center text-8xl text-white bg-none dark:bg-none">
                Loading...
                </div>
            </div>
        )
    }


    const instructionPanel = () => {
        return(
            <div className="bg-white dark:bg-grayDark
                            flex flex-col self-center text-xl">
                <div className="flex justify-center text-white">
                    This section contains the current layers of filters that are going to be applied to your resumes.
                    Click on predetermined filters to add them to the list, or add your own by typing in a custom keyword bias.
                    Arrange the importance of each filter by dragging them to different positions within the list. 
                </div>
            </div>
        )
    }





    return (
        <div className="overflow-y-auto overflow-x-clip flex h-full w-full flex-row space-x-[2rem] bg-grayDark">
            {loadingState && 
                <Modal modalTrigger={loadingState} onClose={()=>{setLoadingState(false)}}>
                    <FilterLoadingPanel/>
                </Modal>
            }
            <div className="flex flex-col grow min-h-auto w-min p-[1rem] m-[2rem] bg-grayMidDark rounded-lg">
                <div className='sticky flex flex-row justify-center z-[1] top-0'>
                    <div className="flex flex-col flex-shrink text-5xl text-white p-[1rem] mb-0.5">
                        Current Filter Layers:
                    </div>
                </div>
                <div className="flex flex-col select-none overflow-y-scroll">
                    <div className="pb-[1.5rem]"/>
                    <DraggableList
                        uniqueIDItems={selectedFilters}
                        setUniqueIDItems={setSelectedFilters}
                        ItemCard={FilterLayerCard}
                        className="flex flex-grow flex-col"
                    />
                    <div className="pb-[3rem]"/>
                </div>
            </div>
            <div className='sticky top-0 flex flex-grow'>
                <div className="bg-[gray] dark:bg-grayDark text-white
                                flex flex-col flex-grow px-[3rem] pt-[1rem] pb-[3rem]">
                    <div className="self-center text-[5rem]">Filters</div>
                    <FilterLayerOptions />
                </div>
            </div> 
        </div>
    )

}


export default FilterScreen