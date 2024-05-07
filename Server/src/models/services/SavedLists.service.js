import { savedLists, users } from "../../database/MongoDB.database.js"





export const uploadSavedList = async (savedList, listID, fileIDs, userID) => {

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

}