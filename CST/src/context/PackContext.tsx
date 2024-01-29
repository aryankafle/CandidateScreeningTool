//THIS FILE DONT DELETE ITS JUST A COPY FOR ROUTING LATER ill fix it then (IT DOES NOTHING RN)


import { ReactNode, createContext, useState } from "react"





type PackContextType = {
    uploadedPacks: File[]
    setUploadedPacks: React.Dispatch<React.SetStateAction<File[]>>
}

const PackContextInitial = {
    uploadedPacks: [] as File[],
    setUploadedPacks: {} as React.Dispatch<React.SetStateAction<File[]>>
}





export const PackContext = createContext<PackContextType>(PackContextInitial)

const PackContextProvider = (props: { children : ReactNode }) => {

    const [uploadedPacks, setUploadedPacks] = useState([] as File[])
    
    return (
        <PackContext.Provider value={{uploadedPacks, setUploadedPacks}}>
            {props.children}
        </PackContext.Provider>
    )

}

export default PackContextProvider