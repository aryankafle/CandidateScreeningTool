import { Result } from "./Result";
import { UniquelyIdentified } from "./UniquelyIdentified";
import { UserOwned } from "./UserOwned";

export class SavedList implements UserOwned, UniquelyIdentified {

    private static readonly PUBLIC_URL = `${process.env.PUBLIC_URL}`
    private static readonly RESULTS_ROUTE = "/results"

    id : string = crypto.randomUUID()

    readonly owner : string
    readonly shared : string[]



    public readonly listLink : string;


    public name : string

    public description : string;

    public color : string;



    public readonly results : Result[];





    constructor( name : string, description : string, results : Result[], color : string = "#FFFFFFFF", owner : string, sharedTo : string[] = [] ) {

        this.owner = owner;
        this.shared = [];

        this.name = name;
        this.description = description;
        this.color = color

        this.results = [...results].sort((a : Result, b : Result) => b.overallScore - a.overallScore )

        this.listLink = `${SavedList.PUBLIC_URL}${SavedList.RESULTS_ROUTE}/${this.id}`

    }



    public static combine(listA : SavedList, listB : SavedList) {

        return new SavedList(
            "name",
            `Combination of ${listA.name} & ${listB.name}`,
            [...listA.results, ...listB.results],
            undefined,
            listA.owner,
        )
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



    public static fromJSON(jsonlist : any) {

        const translatedList = {
            name: jsonlist.name_of_list,
            description: jsonlist.description_of_list,
            results: jsonlist.results?.map((result : any) => Result.fromJSON(result)),
            owner: jsonlist.owner_of_list,
            shared: jsonlist.usersWithAcess,
            id: jsonlist._id
        }

        for(const item in translatedList) {

            if(!item) return undefined

        }

        if(translatedList.results?.length < 1) return undefined


        
        const list = new SavedList(
            translatedList.name,
            translatedList.description,
            translatedList.results,
            translatedList.owner,
            translatedList.shared
        )

        list.id = translatedList.id

        return list
    }
    
}