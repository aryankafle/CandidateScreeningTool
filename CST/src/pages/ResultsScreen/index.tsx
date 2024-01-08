import { isNamedTupleMember } from "typescript";

const ResultsScreen = () => {

    const candidates = []; //temporary placeholder for the filtered candidates 

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