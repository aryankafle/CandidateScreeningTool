import { savedLists, users } from "../../database/MongoDB.database"





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



export const deleteUploadedSavedList = async (listID) => {

    await savedLists.deleteOne({_id: listID})

}





export const getUserSavedLists = async (owner) => {
    
    return await savedLists.find({ owner_of_list: { $eq: owner } }).toArray();
    
}