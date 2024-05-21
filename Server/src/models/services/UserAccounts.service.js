import { ObjectId } from "mongodb";
import { users, savedLists } from "../../database/MongoDB.database.js";





export const addUser = async (userToken) => {

    
    const id = userToken?.id

    if(!id) return;

    const existingUser = await getUser(id)
    
    if(existingUser) return;

    await users.insertOne({ 
        _id: id,
        user_token: userToken,
        saved_list_ids: [],
        current_location: "/home",
        current_saved_list: null
    })

}



export async function getUser(userID) {

    const user = await users.findOne( { _id: userID } )

    if(!user) return undefined

    return user

}





export const getUserSelection = async (userID) => {

    const user = await users.findOne( { _id: userID } )

    return {

        user: userID,
        currentSavedList: user.current_saved_list,
        location: user.current_location,

    }

}



export const setUserSelection = async (userID, selection) => {
    
    const user = await users.findOne( { _id: userID } )

    if(!user) return;

    const currentSavedList = selection.currentSavedList || user.current_saved_list
    const location = selection.location || user.current_location



    if(location && location !== null) {
        await users.updateOne({ _id: userID }, { $set: { current_location: location } })
    }

    if(currentSavedList && currentSavedList !== null) {
        await users.updateOne({ _id: userID }, { $set: { current_saved_list: currentSavedList } }) 
    }

}





export const getUserSavedLists = async (owner) => {
    
    return await savedLists.find({ owner_of_list: { $eq: owner } }).toArray();
    
}





export const getExternalList = async (extListID) => {

    const _id = new ObjectId(extListID)

    const savedList = await savedLists.findOne({ _id })
    
    return savedList

}