import { ReactNode, createContext, useState } from "react"
import { Result } from "../utils/Result"

export class SavedList {

    #listName : string;
    get listName(){return this.#listName}
    set listName(newName : string){this.#listName = newName}

    #listDescription : string;
    get listDescription(){return this.#listDescription}
    set listDescription(newDescription : string){this.#listDescription = newDescription}

    #color : string;
    get color(){return this.#color}
    set color(newColor : string){this.#color = newColor}

    #orderedResumeList : Result[]
    get orderedResumeList() {return this.#orderedResumeList}
    


    constructor(name : string, description : string, orderedResumeList : Result[], color? : string) {
        this.#listName = name;
        this.#listDescription = description;
        this.#orderedResumeList = orderedResumeList;
        this.#color = color || "#FFFFFFFF";
    }



    public static isEqual (savedList : SavedList, otherSavedList : SavedList) {
        if(savedList.listName !== otherSavedList.listName) return false;
                
        return true;
    }



    public static combine (savedLists : SavedList[], newName? : string, newDescription? : string, newColor? : string) {
        
        let combinedNames = ""
        
        for(let i = 0; i < savedLists.length; i++) {
            if(i < savedLists.length - 1) {
                combinedNames += ` ${savedLists[i].listName},`
            } 
            else {
                combinedNames += ` and ${savedLists[i].listName}`
            }
        }



        const name = newName || `Combination of:${combinedNames}.`;
        const description = `Combined List of the following lists:${combinedNames}.`
        const combinedResults = savedLists.flatMap((savedList) => savedList.orderedResumeList)



        return new SavedList(name, description, combinedResults, newColor)

    }
}




type SavedListsContextType = {

    savedLists: SavedList[]
    setSavedLists: React.Dispatch<React.SetStateAction<SavedList[]>>

}

const SavedListsContextInitial = {

    savedLists: [] as SavedList[],
    setSavedLists: {} as React.Dispatch<React.SetStateAction<SavedList[]>>

}





export const SavedListsContext = createContext<SavedListsContextType>(SavedListsContextInitial)

const SavedListsContextProvider = (props: { children : ReactNode }) => {

    const [savedLists, setSavedLists] = useState([] as SavedList[])
    
    return (
        <SavedListsContext.Provider value={{savedLists, setSavedLists}}>
            {props.children}
        </SavedListsContext.Provider>
    )

}

export default SavedListsContextProvider