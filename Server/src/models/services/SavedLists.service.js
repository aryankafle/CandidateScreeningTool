import { savedLists, users } from "../../database/MongoDB.database.js"





export const uploadSavedList = async (listID, fileIDs, userID) => {

    await savedLists.insertOne({

        _id: listID,
        file_ids: fileIDs,
        owner_of_list: userID,
        shared_with: []

    })

    await users.updateOne({ _id: userID }, { 
        $push: { saved_list_ids: listID }, 
    })

}



export const deleteSavedList = async (listID) => {

    await savedLists.deleteOne({_id: listID})

}