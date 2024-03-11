import { UniquelyIdentified } from "./UniquelyIdentified";

export abstract class Filter extends UniquelyIdentified{

    protected static MAX_STRENGTH = 1000;
    protected static MAX_SCORE = 1000

    public readonly totalQuery;
    public readonly initialQuery = `
        Filters are questions about a file's text. They will ask about a certain aspect of its text.
        A score measures how well a file's text answers the question posed by the filter. It is your job to assign a score value for the above file's text. 
        A score near 0 would associate with a file text that does not, or barely, answers the question.
        A score near ${Filter.MAX_SCORE} associates with a file text that answers the question very well. 
        Scores are a floating point number between the values 0 and ${Filter.MAX_SCORE}. Assign the file text above a score based upon how well it answers the following Filter question: 
    `;
    public readonly filterQuery;
    public readonly endQuery = `
        Only include in your response the numerical value of the score.
    `



    public readonly description;
    public readonly quantity?



    constructor(description : string, filterQuery : string, quantity? : number) {
        super();
        
        this.filterQuery = filterQuery
        this.totalQuery = `${this.initialQuery} "${filterQuery}" ${this.endQuery}`

        this.description = description
        this.quantity = quantity
    }



    public toString() {

        return `${this.id}: ${this.quantity} ${this.description}`

    }



    public toJson() {
        return {
            id: this.id,

            filterName: this.description,
            filterQuantity: this.quantity,

            query: this.totalQuery,
        }
    }



    /* For content-level deep comparisons of Filters */
    public equals(obj: Object) {
        
        const filter = obj as Filter

        if(filter) {
            
            return filter.description === this.description && filter.quantity === this.quantity
        }

        return false

    }



    /* For id-level deep comparisons of Filters */
    public is(obj: Object) {
        
        const filter = obj as Filter

        if(filter) {
            return filter.id === this.id && filter.description === this.description && filter.quantity === this.quantity
        }

        return false

    }

}