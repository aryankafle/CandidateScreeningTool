import { users } from "../../database/MongoDB.database";





export const addUser = async (userToken) => {

    try {

        await users.insertOne({ _id: userToken.id, user_token: userToken, saved_list_ids: [], current_location: null, current_saved_list: null })
    
    }
    catch (error) {

        console.log("----User already registered.")
        return;

    }

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

    const currentSavedList = selection.currentSavedList || user.current_saved_list
    const location = selection.location || user.current_location



    if(location && location !== null) {
        await users.updateOne({ _id: userID }, { $set: { current_location: location } })
    }

    if(currentSavedList && currentSavedList !== null) {
        await users.updateOne({ _id: userID }, { $set: { current_saved_list: currentSavedList } }) 
    }

}