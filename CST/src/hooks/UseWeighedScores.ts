import { useMemo } from "react";
import Result, { WeighedScores, weighScoresForOneResult } from "../utils/Result";

export type WeighedResult = Result & WeighedScores



function useWeighedScores(results : Result[]) : WeighedResult[] {

    const weighedScores = useMemo(() => {

        return results.map( ( result : Result ) => {

            const weighedScoresAndOverall : WeighedScores = weighScoresForOneResult(result.filterScores)

            const weighedResult : WeighedResult = {

                ...weighedScoresAndOverall,
                ...result,

            }

            return weighedResult

        })

    }, [results])

    return weighedScores

}

export default useWeighedScores