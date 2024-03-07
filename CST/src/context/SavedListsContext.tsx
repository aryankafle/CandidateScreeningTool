import { ReactNode, createContext, useState } from "react"
import { Result } from "../utils/Result"

export class SavedList {

    #id : string
    get id() {return this.#id}
    set id(id : string) {this.#id = id}

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

    #listLink : string;
    get listLink() {return this.#listLink}
    




    private generateLink() {
        return "dummylinkfor+" + this.#listName
    }

    constructor(name : string, description : string, resumes : Result[], color? : string) {
        this.#listName = name;
        this.#listDescription = description;
        this.#orderedResumeList = resumes.sort((a : Result, b : Result) => b.overallScore - a.overallScore )
        this.#color = color || "#FFFFFFFF";
        this.#listLink = this.generateLink()
        this.#id = crypto.randomUUID()
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

    savedLists : SavedList[]
    setSavedLists : React.Dispatch<React.SetStateAction<SavedList[]>>
    currentSavedList? : SavedList
    setCurrentSavedList : React.Dispatch<React.SetStateAction<SavedList | undefined>>

}

const SavedListsContextInitial = {

    savedLists: [] as SavedList[],
    setSavedLists: {} as React.Dispatch<React.SetStateAction<SavedList[]>>,
    currentSavedList : undefined,
    setCurrentSavedList : {} as React.Dispatch<React.SetStateAction<SavedList | undefined>>

}





export const SavedListsContext = createContext<SavedListsContextType>(SavedListsContextInitial)

const SavedListsContextProvider = (props: { children : ReactNode }) => {

    const [savedLists, setSavedLists] = useState([] as SavedList[])
    const [currentSavedList, setCurrentSavedList] = useState<SavedList | undefined>(undefined)
    
    return (
        <SavedListsContext.Provider value={{savedLists, setSavedLists, currentSavedList, setCurrentSavedList}}>
            {props.children}
        </SavedListsContext.Provider>
    )

}

export default SavedListsContextProvider