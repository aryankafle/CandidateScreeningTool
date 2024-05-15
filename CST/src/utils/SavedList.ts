export function savedListFromJSON(jsonlist : any) {

    const savedList : SavedList = {

        _id: jsonlist._id,
        file_ids: jsonlist.file_ids,
        list_link: jsonlist.list_link,
        owner_of_list: jsonlist.owner_of_list,
        shared_with: jsonlist.shared_with,
        name: jsonlist.name,
        description: jsonlist.description,
        color: jsonlist.color

    }

    return savedList

}

export type SavedList = {

    readonly _id : string,
    readonly file_ids : string[]
    readonly list_link : string,
    readonly owner_of_list : string,
    readonly shared_with : string[],
    readonly name : string,
    readonly description : string,
    readonly color : string,

}