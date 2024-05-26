import { ReactNode, createContext, useCallback, useContext, useEffect, useMemo, useState } from "react"

import { runTextScanOnFile } from "../requests/ResumeRequests"
import { runPromisesInParallel } from "../utils/ParallelPromises"

import Result from "../utils/Result"
import SelectionContext from "./SelectionContext"
import UserContext from "./UserContext"
import FlagContext from "./FlagContext"





type UploadProgress = {

    file : File,
    uploadProgress : number,
    downloadProgress : number

}


const BatchContextInitial = {

    batchResults : [] as Result[],
    setBatchResults : {} as React.Dispatch<React.SetStateAction<Result[]>>,

    amountTextScanned : 0,
    setAmountTextScanned : {} as React.Dispatch<React.SetStateAction<number>>,
    areAllTextScansReady : false,

    amountResultsCreated : 0,
    setAmountResultsCreated : {} as React.Dispatch<React.SetStateAction<number>>,
    areAllResultsReady : false,

    fileProgresses : [] as UploadProgress[],
    setFileProgresses : {} as React.Dispatch<React.SetStateAction<UploadProgress[]>>,

    fileIDs : [] as string[],
    setFileIDs : {} as React.Dispatch<React.SetStateAction<string[]>>,

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
            
            return {
                
                file,
                uploadProgress: 0,
                downloadProgress: 0,

            }

        }))

    }, [ uploadedFiles, setFileProgresses ])

    useEffect(() => {

        if(!userData) return;

        const promises = fileIDs.map(async (fileID) => {

            await runTextScanOnFile(fileID, userData.id)

            setAmountTextScanned(prevAmountScanned => prevAmountScanned +  1)
            
        })

        runPromisesInParallel(promises)

    }, [fileIDs, flags.active, updateFlag, userData])

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