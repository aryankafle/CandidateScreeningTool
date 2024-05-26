export async function runPromisesInParallel<T>(promises : Promise<T>[]) {

    const settleResults = await Promise.allSettled(promises)

    const successfulValues = settleResults
    .filter(settleResult => settleResult.status === "fulfilled")
    .map(result => ( result as PromiseFulfilledResult<T> ).value )

    const failedResults = settleResults
    .filter(settleResult => settleResult.status === "rejected")

    const values = settleResults
    .map(settleResult => {

        if(settleResult.status === "fulfilled") return settleResult.value

        return undefined

    })

    return {settleResults, successfulValues, failedResults, values}

}