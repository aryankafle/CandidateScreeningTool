import React from "react";


const ResultsScreen = () => {
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
                <img src={"../assets/a-rating.png"} alt="A"></img>
            );
        }else{
            return(
                <img src={"../assets/b-rating.png"} alt="B"></img>
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

    const ResultsCard = ({candidate} : {candidate:Candidate}) => {
        return(
            <div className="border-black text-black 
                            dark:border-white dark:text-white 
                            flex flex-row border-[0.1rem] px-[2rem]">
                {candidate.getName + ' ' + candidate.getRank}
            </div>
        )
    }

    const showIndividualCandidate = () => {
        console.log("button clicked")
    }


    return(
        <div className="dark:bg-blue bg-white w-screen text-2xl">
            <div className="my-10 max-w-screen-sm p-6 dark:bg-white bg-blue rounded-r-full flex basis-1/2 place-content-center">
                <div>
                    <h1>Here are some great candidates based on your needs:</h1>
                </div>
            </div>
            <div className="flex justify-center">
                <ol className="space-y-5">
                    {candidates.map((Candidate)=><li><ResultsCard candidate={Candidate}></ResultsCard></li>)}
                </ol>
            </div>
        </div>
    );
}

export default ResultsScreen