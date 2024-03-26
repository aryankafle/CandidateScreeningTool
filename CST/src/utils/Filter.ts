import { UniquelyIdentified } from "./UniquelyIdentified";

export abstract class Filter implements UniquelyIdentified {

    readonly id : string = crypto.randomUUID()

    protected static MAX_SCORE = 1000

    public readonly filterQuery;
    public readonly description;
    public readonly quantity?



    constructor(description : string, filterQuery : string, quantity? : number) {
        
        this.filterQuery = filterQuery
        this.filterQuery = `
            ${filterQuery}

            The score must be between 0 and ${Filter.MAX_SCORE}
        `

        this.description = description
        this.quantity = quantity
    }



    public toString() {

        return `${this.id}: ${this.quantity} ${this.description}`

    }



    public toJSON() {
        return {

            id: this.id,

            filterName: this.description,
            filterQuantity: this.quantity,

            query: this.filterQuery,

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