

const ResultsComponent = ()=> {
    class Candidate
    {
        name: string;
        rank: string;
        constructor(name: string, rank: string){
            this.name = name;
            this.rank = rank;
        }

        get getRank(){
            return this.rank;
        }
        
    }
    var candidates = []; //temporary placeholder for the filtered candidates 
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

    return(
        <div>
            
        </div>
    );
}

export default ResultsComponent