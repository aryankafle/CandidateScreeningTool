import { ReactNode, createContext, useCallback, useContext, useEffect, useMemo, useState } from "react"


import Result from "../utils/Result"
import FlagContext from "./FlagContext"
import SelectionContext from "./SelectionContext"





type UploadProgress = {

    file : File,
    uploadProgress : number

}


const BatchContextInitial = {

    batchResults : [] as (Result | undefined)[],
    setBatchResults : {} as React.Dispatch<React.SetStateAction<(Result | undefined)[]>>,

    amountResultsCreated : 0,
    setAmountResultsCreated : {} as React.Dispatch<React.SetStateAction<number>>,
    areAllResultsReady : false,

    fileProgresses : [] as (UploadProgress | undefined)[],
    setFileProgresses : {} as React.Dispatch<React.SetStateAction<(UploadProgress | undefined)[]>>,

    fileIDs : [] as (string | undefined)[],
    setFileIDs : {} as React.Dispatch<React.SetStateAction<(string | undefined)[]>>,

    clearBatchContext : {} as () => void

}

type BatchContextType = typeof BatchContextInitial






const BatchContext = createContext<BatchContextType>(BatchContextInitial)

export default BatchContext



export const BatchContextProvider = (props: { children : ReactNode }) => {

    const { uploadedFiles } = useContext(SelectionContext)

    const { updateFlag } = useContext(FlagContext)

    const [batchResults, setBatchResults] = useState(BatchContextInitial.batchResults)

    const [amountResultsCreated, setAmountResultsCreated] = useState(BatchContextInitial.amountResultsCreated)

    const [fileIDs, setFileIDs] = useState(BatchContextInitial.fileIDs)

    const [fileProgresses, setFileProgresses] = useState(BatchContextInitial.fileProgresses)

    const clearBatchContext = useCallback(() => {

        setBatchResults([])
        setFileIDs([])
        setFileProgresses([])

    }, [setBatchResults, setFileIDs])



    useEffect(() => {

        setFileProgresses(uploadedFiles.map(file => {
            
            if(!file) {

                return undefined
                
            }

            return {
                
                file,
                uploadProgress: 0,

            }

        }))

    }, [ uploadedFiles, setFileProgresses ])

    
    useEffect(() => {

        if(batchResults.length > 0) {

            updateFlag({flag: "batch results created", action: "activate"})

        }

    }, [updateFlag, batchResults])

    const areAllResultsReady = useMemo(() => amountResultsCreated === fileIDs.length, [amountResultsCreated, fileIDs])




    return (
        <BatchContext.Provider value={{
                
                batchResults, setBatchResults,
                fileIDs,  setFileIDs,

                amountResultsCreated, setAmountResultsCreated, areAllResultsReady,

                fileProgresses, setFileProgresses,

                clearBatchContext
                
            }}>

            {props.children}

        </BatchContext.Provider>
    )

}