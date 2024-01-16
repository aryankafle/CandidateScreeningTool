//THIS FILE DONT DELETE ITS JUST A COPY FOR ROUTING LATER ill fix it then (IT DOES NOTHING RN)


import { ReactNode, createContext, useState } from "react"





type PackContextType = {
    uploadedPacks: string[]
    chosenPacks: string[]
    setUploadedPacks: React.Dispatch<React.SetStateAction<string[]>>
    setChosenPacks: React.Dispatch<React.SetStateAction<string[]>>
}

const PackContextInitial = {
    uploadedPacks: [] as string[],
    chosenPacks: [] as string[],
    setUploadedPacks: {} as React.Dispatch<React.SetStateAction<string[]>>,
    setChosenPacks: {} as React.Dispatch<React.SetStateAction<string[]>>
}





export const PackContext = createContext<PackContextType>(PackContextInitial)

const PackContextProvider = (props: { children : ReactNode }) => {

    const [uploadedPacks, setUploadedPacks] = useState([] as string[])
    const [chosenPacks, setChosenPacks] = useState([] as string[])
    
    return (
        <PackContext.Provider value={{uploadedPacks, chosenPacks, setUploadedPacks, setChosenPacks}}>
            {props.children}
        </PackContext.Provider>
    )

}

export default PackContextProvider