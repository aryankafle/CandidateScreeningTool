import { ReactNode, createContext, useCallback, useState } from "react"

import Result from "../utils/Result"





const BatchContextInitial = {

    batchResults : [] as Result[],
    setBatchResults : {} as React.Dispatch<React.SetStateAction<Result[]>>,

    fileIDs : [] as string[],
    setFileIDs : {} as React.Dispatch<React.SetStateAction<string[]>>,

    clearBatchContext : {} as () => void

}

type BatchContextType = typeof BatchContextInitial






const BatchContext = createContext<BatchContextType>(BatchContextInitial)

export default BatchContext



export const BatchContextProvider = (props: { children : ReactNode }) => {

    const [batchResults, setBatchResults] = useState(BatchContextInitial.batchResults)

    const [fileIDs, setFileIDs] = useState(BatchContextInitial.fileIDs)

    const clearBatchContext = useCallback(() => {

        setBatchResults([])
        setFileIDs([])

    }, [setBatchResults, setFileIDs])

    return (
        <BatchContext.Provider value={{
                
                batchResults, setBatchResults,
                fileIDs,  setFileIDs,

                clearBatchContext
                
            }}>

            {props.children}

        </BatchContext.Provider>
    )

}