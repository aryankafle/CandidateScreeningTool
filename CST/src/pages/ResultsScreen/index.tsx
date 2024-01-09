import ResultsComponent from "../../components/ResultsComponent";

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
    var candidates: Candidate[] = []; //temporary placeholder for the filtered candidates 
    generateCandidates();
    
    function generateCandidates(){
        for (let i = 0; i < 10; i++){
            var r = 'A';
            if (i%2 === 0){
                r = 'B';
            }
            candidates.push(new Candidate('Bob' + i, r))
        }
    }

    //const mappedCandidates = candidates.map((candidates)=><li>{candidates}</li>)
    
    return(
        <div className="dark:bg-blue bg-white w-screen">
            <div className="my-10 max-w-screen-sm p-6 bg-white rounded-r-full flex basis-1/2 place-content-center">
                <div className="text-2xl">
                    <h1>Here are some great candidates based on your needs:</h1>
                </div>
            </div>
            <div>
                
            </div>
        </div>
    );
}

export default ResultsScreen