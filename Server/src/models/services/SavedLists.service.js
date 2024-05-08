import { savedLists, users } from "../../database/MongoDB.database.js"
import { ObjectId } from "mongodb"




export const uploadList = async (savedList, fileIDs, userID) => {

    const listID = new ObjectId()

    await savedLists.insertOne({

        _id: listID,
        file_ids: fileIDs,
        owner_of_list: userID,
        shared_with: savedList.sharedUsers,
        name: savedList.name,
        description: savedList.description,
        color: savedList.color

    })

    await users.updateOne({ _id: userID }, { 
        $push: { saved_list_ids: listID }, 
    })

    return listID

}



export async function getList(listID) {

    const list = await savedLists.findOne( { _id: listID } )
  
    if(!list) return undefined
  
    return list
  
}



export async function deleteList(listID) {

    await users.updateMany( {}, { $pull: { saved_list_ids : listID } } )

    await savedLists.deleteMany( { _id: listID } )

}