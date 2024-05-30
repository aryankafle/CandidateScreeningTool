import { useMemo } from "react";
import Result, { WeighedScores, weighScoresForOneResult } from "../utils/Result";

export type WeighedResult = Result & WeighedScores



function useWeighedScores(results : (Result | undefined)[]) : (WeighedResult | undefined)[] {

    const weighedScores = useMemo(() => {

        return results
        .map( ( result : (Result | undefined) ) => {

            if(!result) return undefined

            const weighedScoresAndOverall : WeighedScores = weighScoresForOneResult(result.filterScores)

            const weighedResult : WeighedResult = {

                ...weighedScoresAndOverall,
                ...result,

            }

            return weighedResult as WeighedResult

        })

    }, [results])

    return weighedScores

}

export default useWeighedScores