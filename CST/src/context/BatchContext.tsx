import { ReactNode, createContext, useCallback, useContext, useEffect, useMemo, useState } from "react"

import { runTextScanOnFile } from "../requests/ResumeRequests"
import { runPromisesInParallel } from "../utils/ParallelPromises"

import Result from "../utils/Result"
import FlagContext from "./FlagContext"
import SelectionContext from "./SelectionContext"
import UserContext from "./UserContext"





type UploadProgress = {

    file : File,
    uploadProgress : number

}


const BatchContextInitial = {

    batchResults : [] as (Result | undefined)[],
    setBatchResults : {} as React.Dispatch<React.SetStateAction<(Result | undefined)[]>>,

    amountTextScanned : 0,
    setAmountTextScanned : {} as React.Dispatch<React.SetStateAction<number>>,
    areAllTextScansReady : false,

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

    const { flags, updateFlag } = useContext(FlagContext)

    const { userData } = useContext(UserContext)

    const [batchResults, setBatchResults] = useState(BatchContextInitial.batchResults)

    const [amountTextScanned, setAmountTextScanned] = useState(BatchContextInitial.amountTextScanned)
    const [amountResultsCreated, setAmountResultsCreated] = useState(BatchContextInitial.amountResultsCreated)

    const [fileIDs, setFileIDs] = useState(BatchContextInitial.fileIDs)

    const [fileProgresses, setFileProgresses] = useState(BatchContextInitial.fileProgresses)

    const clearBatchContext = useCallback(() => {

        setBatchResults([])
        setFileIDs([])
        setAmountTextScanned(0)
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

        if(!userData) return;

        const promises = fileIDs.map(async (fileID) => {

            if(!fileID) {

                setAmountResultsCreated(prevAmountTextScanned => prevAmountTextScanned + 1)
                return;

            }

            await runTextScanOnFile(fileID, userData.id)

            setAmountTextScanned(prevAmountScanned => prevAmountScanned +  1)
            
        })

        runPromisesInParallel(promises)

    }, [fileIDs, flags.active, updateFlag, userData])

    
    useEffect(() => {

        if(batchResults.length > 0) {

            updateFlag({flag: "batch results created", action: "activate"})

        }

    }, [updateFlag, batchResults])

    const areAllTextScansReady = useMemo(() => amountTextScanned === fileIDs.length, [amountTextScanned, fileIDs])
    const areAllResultsReady = useMemo(() => amountResultsCreated === fileIDs.length, [amountResultsCreated, fileIDs])




    return (
        <BatchContext.Provider value={{
                
                batchResults, setBatchResults,
                fileIDs,  setFileIDs,

                amountTextScanned, setAmountTextScanned, areAllTextScansReady,
                amountResultsCreated, setAmountResultsCreated, areAllResultsReady,

                fileProgresses, setFileProgresses,

                clearBatchContext
                
            }}>

            {props.children}

        </BatchContext.Provider>
    )

}