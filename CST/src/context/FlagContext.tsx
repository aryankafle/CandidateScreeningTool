import { ReactNode, SetStateAction, createContext, useEffect, useState, useContext } from "react"
import { Filter } from "./FilterContext"
import { SavedList } from "./SavedListsContext"

import { useLocation, Location } from "react-router-dom"
import { postUserCurrentSavedList, postUserLocation } from "../requests/ResumeRequests"
import { UserContext } from "./UserContext"
import { filterCircleSharp } from "ionicons/icons"








type FlagContextType = {

    filtersChanged : boolean,
    setFiltersChanged : React.Dispatch<SetStateAction<boolean>>

}

const FlagContextInitial = {

    filtersChanged : false,
    setFiltersChanged : {} as React.Dispatch<SetStateAction<boolean>>

}





export const FlagContext = createContext<FlagContextType>(FlagContextInitial)

const FlagContextProvider = (props: { children : ReactNode }) => {

    const [ filtersChanged, setFiltersChanged ] = useState<boolean>(false)



    return (
        <FlagContext.Provider value={{
                filtersChanged, setFiltersChanged
            }}>
            {props.children}
        </FlagContext.Provider>
    )

}

export default FlagContextProvider