import { Result } from "./Result";
import { UniquelyIdentified } from "./UniquelyIdentified";

export class SavedList extends UniquelyIdentified{

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

    constructor(name : string, description : string, resumes : Result[], color : string = "#FFFFFFFF") {

        super()

        this.#listName = name;
        this.#listDescription = description;
        this.#orderedResumeList = resumes.sort((a : Result, b : Result) => b.overallScore - a.overallScore )
        this.#color = color || "#FFFFFFFF";
        this.#listLink = this.generateLink()

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