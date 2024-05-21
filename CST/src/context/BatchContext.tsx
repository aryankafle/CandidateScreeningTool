import { ReactNode, createContext, useCallback, useContext, useEffect, useState } from "react"

import Result from "../utils/Result"
import SelectionContext from "./SelectionContext"



type UploadProgress = {

    file : File,
    uploadProgress : number,
    downloadProgress : number

}


const BatchContextInitial = {

    batchResults : [] as Result[],
    setBatchResults : {} as React.Dispatch<React.SetStateAction<Result[]>>,

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

    useEffect(() => {

        setFileProgresses(uploadedFiles.map(file => {
            
            return {
                
                file,
                uploadProgress: 0,
                downloadProgress: 9

            }

        }))

    }, [ uploadedFiles ])



    const [batchResults, setBatchResults] = useState(BatchContextInitial.batchResults)

    const [fileIDs, setFileIDs] = useState(BatchContextInitial.fileIDs)

    const [fileProgresses, setFileProgresses] = useState(BatchContextInitial.fileProgresses)

    const clearBatchContext = useCallback(() => {

        setBatchResults([])
        setFileIDs([])

    }, [setBatchResults, setFileIDs])

    return (
        <BatchContext.Provider value={{
                
                batchResults, setBatchResults,
                fileIDs,  setFileIDs,

                fileProgresses, setFileProgresses,

                clearBatchContext
                
            }}>

            {props.children}

        </BatchContext.Provider>
    )

}