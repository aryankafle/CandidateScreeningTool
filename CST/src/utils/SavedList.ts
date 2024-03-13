import { Result } from "./Result";
import { UniquelyIdentified } from "./UniquelyIdentified";
import { UserOwned } from "./UserOwned";

export class SavedList implements UserOwned, UniquelyIdentified {

    private static readonly PUBLIC_URL = `${process.env.PUBLIC_URL}`
    private static readonly RESULTS_ROUTE = "/results"

    readonly id = crypto.randomUUID()

    readonly owner : string
    readonly shared : string[]



    public readonly listLink : string;


    public name : string

    public description : string;

    public color : string;



    public readonly results : Result[];





    constructor( name : string, description : string, results : Result[], color : string = "#FFFFFFFF", owner : string, sharedTo : string[] = [] ) {

        this.owner = "";
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
            owner_of_list: this.owner,
            users_with_access: [ ...this.shared ],
            name: this.name,
            description: this.description,
            color: this.color,
            results: [...this.results.map( result => result.toJSON() ) ],
            link: this.listLink,
        }
    }
    
}