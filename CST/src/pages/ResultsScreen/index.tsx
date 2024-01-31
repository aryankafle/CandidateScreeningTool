import React, { useState } from "react";
import Modal from '../../components/modals/Modal';
import ResultsDescriptionPopup from "../../components/modals/ResultDescriptionPopup";
import { SavedList } from "../../context/SavedListsContext";
import { Result } from "../../utils/Result";
import { bookmarkOutline } from 'ionicons/icons';
import { IonIcon } from "@ionic/react";


const ResultsScreen = () => {
    const [showModal, setShowModal] = useState(false);
    const [showSidePanel, setShowSidePanel] = useState(true);
    const [selectedResult, setSelectedResult] = useState(0);
    
    const toggleModal = () => {
        setShowModal(!showModal);
    };

    var savedList = new SavedList("Coders", "theres some cool coders in here", []);
    let candidates = savedList.orderedResumeList;
    var isPreviouslySaved = false;

    class Candidate
    {
        name: string;
        rank: string;
        description: string;
        filters: string[];

        constructor(name: string, rank: string, description: string, filters: string[]){
            this.name = name;
            this.rank = rank;
            this.description = description;
            this.filters = filters;
        }

        get getName(){
            return this.name;
        }

        get getRank(){
            return this.rank;
        }

        get getDescription(){
            return this.description;
        }

        get getFilters(){
            return this.filters;
        }
    }

    function getCandidateImage1(result: Result){
        switch(result.grade.toString()){
            case "A":{
                return(<img className='flex items-center w-10' src={`/assets/a-rating.png`} alt="A png"></img>);
            } 
            case "B":{
                return(<img className='flex items-center w-10' src={`/assets/-rating.png`} alt="B png"></img>);
            }
            case "C":{
                return(<img className='flex items-center w-10' src={`/assets/c-rating.png`} alt="C png"></img>);
            }
            case "D":{
                return(<img className='flex items-center w-10' src={`/assets/d-rating.png`} alt="B png"></img>);
            }
        }

        
    }

    const ResultsCard = (props: {candidateIndex: number}) => {
        return(
            <div className="border-black text-black 
                           dark:border-white dark:text-white 
                           flex flex-row border-[0.1rem] px-[2rem] p-2" 
                  onClick={() => { toggleModal(); setSelectedResult(props.candidateIndex)}}>
                {candidates[props.candidateIndex].applicant.name}
                {getCandidateImage1(candidates[props.candidateIndex])}
           </div>
          )
    }


    const SaveListInfo = () => {
        return (
            <div className="flex justify-center">
                <div className="text-2xl">
                    <h1 className="flex justify-center">List Name</h1>
                    <input type="text" className="bg-gray rounded-md"/>
                </div>
            </div>
        )
    }

    return (
        <div className="dark:bg-blue bg-white
                        text-2xl flex flex-row 
                        flex-grow overflow-scroll">
            <div className="flex flex-col flex-grow overflow-scroll" >
                <Modal modalTrigger={showModal} onClose={()=>{setShowModal(false)}}>
                    <ResultsDescriptionPopup onXClicked={()=>{setShowModal(false)}} 
                    selectedResult={candidates[selectedResult]}
                    ></ResultsDescriptionPopup>
                </Modal>
                <div className="flex my-10 max-w-screen-sm p-6 dark:bg-white bg-blue rounded-r-full">
                    <h1>Here are some great candidates based on your needs:</h1>
                </div>
                <div className="flex justify-center">
                    <ol className="space-y-5">
                    {candidates.map((result: Result, index: number)=><li><ResultsCard candidateIndex={index}></ResultsCard></li>)}
                    </ol>
                </div>
            </div>  
            <div className={showSidePanel ? `flex flex-col w-2/5 h-screen bg-white justify-start` : `flex flex-col w-1/10 h-screen bg-white justify-start`}>
                {showSidePanel ?
                    <div className="w-full">
                            <h1 className="flex justify-center" onClick={()=>setShowSidePanel(!showSidePanel)}>List Name</h1>
                            <div className="flex justify-center">
                                <input className="bg-gray" type="text" />
                            </div>
                            <h1 className="flex justify-center">Description</h1>
                            <div className="flex justify-center">
                                {isPreviouslySaved?
                                    savedList.listDescription
                                    :
                                    <input className="bg-gray" type="text" />
                                }
                            </div>
                            <p className="flex justify-center">Save List</p>
                    </div>
                :
                    <div>
                        <IonIcon className="cursor-pointer text-[3rem] p-5" icon={bookmarkOutline} onClick={()=>setShowSidePanel(!showSidePanel)}></IonIcon>
                    </div>
                }
            </div>
        </div>
    );
}

export default ResultsScreen