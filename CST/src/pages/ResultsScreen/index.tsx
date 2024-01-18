import React, { useState } from "react";
import Modal from '../../components/Modal';
import ResultsDescriptionPopup from "../../components/ResultDescriptionPopup";


const ResultsScreen = () => {
    const [showModal, setShowModal] = useState(false);
    const [selectedResult, setSelectedResult] = useState(0);
    
    const toggleModal = () => {
        setShowModal(!showModal);
    };
    
    class Candidate
    {
        name: string;
        rank: string;
        constructor(name: string, rank: string){
            this.name = name;
            this.rank = rank;
        }

        get getName(){
            return this.name;
        }

        get getRank(){
            return this.rank;
        }
    }

    function getCandidateImage(candidate: Candidate){
        if (candidate.getRank === 'A'){
            return(
                <img className='flex items-center w-10' src={`/assets/a-rating.png`} alt="A png"></img>
            );
        }else{
            return(
                <img className='flex items-center w-10' src={`/assets/b-rating.png`} alt="B png" width=''></img>
            );
        }
    }

    function generateCandidates(){
        for (let i = 0; i < 10; i++){
            var r = 'A';
            if (i%2 === 0){
                r = 'B';
            }
            candidates.push(new Candidate('Bob' + i, r))
        }
    }

    var candidates: Candidate[] = []; //temporary placeholder for the filtered candidates 
    generateCandidates();


    const ResultsCard = (props: {candidateIndex: number}) => {
        return(
          <div className="border-black text-black 
                         dark:border-white dark:text-white 
                         flex flex-row border-[0.1rem] px-[2rem] p-2" 
                onClick={() => { toggleModal(); setSelectedResult(props.candidateIndex)}}>
              {candidates[props.candidateIndex].getName}
              {getCandidateImage(candidates[props.candidateIndex])}
         </div>
        )
    }

    return(
        <div className="dark:bg-blue bg-white
                        text-2xl flex flex-col flex-grow">
            <Modal modalTrigger={showModal} onClose={()=>{setShowModal(false)}}>
                <ResultsDescriptionPopup onXClicked={()=>{setShowModal(false)}} selectedResultName={candidates[selectedResult].getName}></ResultsDescriptionPopup>
            </Modal>
            <div className="flex my-10 max-w-screen-sm p-6 dark:bg-white bg-blue rounded-r-full">
                <h1>Here are some great candidates based on your needs:</h1>
            </div>
            <div className="flex justify-center">
                <ol className="space-y-5">
                    {candidates.map((candidate : Candidate, index)=><li><ResultsCard candidateIndex={index}></ResultsCard></li>)}
                </ol>
            </div>
        </div>
    );
}

export default ResultsScreen