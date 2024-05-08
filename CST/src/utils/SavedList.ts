import { getResume } from "../requests/ResumeRequests";
import { Result } from "./Result";

export class SavedList {

    private static readonly PUBLIC_URL = `${process.env.PUBLIC_URL}`
    private static readonly RESULTS_ROUTE = "/results"

    readonly id : string

    readonly owner : string
    readonly shared : string[]



    readonly listLink : string;


    name : string

    description : string;

    color : string;



    public readonly results : Result[];





    constructor(id : string, name : string, description : string, results : Result[], color : string = "#FFFFFFFF", owner : string, sharedTo : string[] = [] ) {

        this.id = id

        this.owner = owner;
        this.shared = [];

        this.name = name;
        this.description = description;
        this.color = color

        this.results = [...results].sort((a : Result, b : Result) => b.overallScore - a.overallScore )

        this.listLink = `${SavedList.PUBLIC_URL}${SavedList.RESULTS_ROUTE}/${this.id}`

    }



    public toJSON() {
        return {
            _id: this.id,
            owner: this.owner,
            sharedUsers: [ ...this.shared ],
            name: this.name,
            description: this.description,
            color: this.color,
            results: [...this.results.map( result => result.toJSON() ) ],
            link: this.listLink,
        }
    }



    public static async fromJSON(jsonlist : any) {

        const translatedList = {
            id: jsonlist._id,
            name: jsonlist.name,
            description: jsonlist.description,
            color: jsonlist.color,
            results: await Promise.all(
                jsonlist.file_ids.map(
                    async (fileID : string) => getResume(fileID, jsonlist._id)
            )),
            owner: jsonlist.owner_of_list,
            shared: jsonlist.shared_with,
        }

        for(const item in translatedList) {

            if(!item) return undefined

        }

        if(translatedList.results.length < 1) return undefined


        
        const list = new SavedList(
            translatedList.id,
            translatedList.name,
            translatedList.description,
            translatedList.results,
            translatedList.color,
            translatedList.owner,
            translatedList.shared
        )

        return list
    }
    
}