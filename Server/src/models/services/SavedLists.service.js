import { ObjectId } from "mongodb"
import { savedLists, users } from "../../database/MongoDB.database.js"
import { addResultToFile } from "./DatabaseFiles.service.js"





export const uploadList = async (

    results,
    name,
    description,
    color,
    owner_of_list

) => {

    const _id = new ObjectId()

    await Promise.all( results.map( result => addResultToFile(result._id, _id, result) ) )

    await savedLists.insertOne({

        _id,
        file_ids: results.map(result => result._id),
        list_link: _id,
        owner_of_list,
        shared_with: [],
        name: name,
        description: description,
        color: color

    })

    await users.updateOne({ _id: owner_of_list }, {

        $push: { saved_list_ids: _id }, 

    })

    return _id

}



export async function getList(listID) {

    const list = await savedLists.findOne( { _id: listID } )
  
    if(!list) return undefined
  
    return list

}



export async function deleteList(listID) {

    const _id = new ObjectId(listID)

    await users.updateMany( {}, { $pull: { saved_list_ids : listID } } )

    await savedLists.deleteMany( { _id } )

}



export async function changeSavedListMetadata(listID, newName, newDescription, newColor) {

    const _id = new ObjectId(listID)

    await savedLists.updateMany( { _id }, {
        $set: {"name": newName}
    } )

    await savedLists.updateMany( { _id }, {
        $set: {"description": newDescription}
    } )

    await savedLists.updateMany( { _id }, {
        $set: {"color": newColor}
    } )

}