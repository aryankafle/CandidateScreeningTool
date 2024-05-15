import { useMemo } from "react";
import Result, { weighScoresForOneResult } from "../utils/Result";



function useWeighedScores(results : Result[]) {

    const weighedScores = useMemo(() => {

        return results.map(result => {

            return {

                weighedScore: weighScoresForOneResult(result.filterScores),
                result,

            }

        })

    }, [results])

    return weighedScores

}

export default useWeighedScores