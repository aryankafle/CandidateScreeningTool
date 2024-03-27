import * as database from '../../database/MongoDB.database.js'; 
import { client } from '../../inits/MongoDB.init.js'
import crypto from "crypto"





export const testMongoDBConnection = () => {

    return database.checkMongoDBConnection()

}





export const viewTable = async () => {

    const db = client.db("resumes")
    const coll = db.collection("example_list")

    await coll.find().toArray()

}





export const uploadNewSavedList = async (original_files, file_textscans, saved_list_id, name_of_list, owner_of_list) => {

    console.log("----Inserting resume data.")





    const db = client.db("resumes")

    const users = db.collection("users")
    const fileBatches = db.collection("file-batches")
    const savedLists = db.collection("saved-lists")


    const files_id = crypto.randomUUID()

    await fileBatches.insertOne({ _id: files_id, original_files, file_textscans })

    await savedLists.insertOne({ 
        _id: saved_list_id, 
        owner_of_list,
        users_with_access: [], 
        name_of_list,
        description_of_list : "",
        files_id,
        color: "", 
        filters: [],
        results: [],
    })



    await users.updateOne({ _id: owner_of_list }, { 
        $push: { saved_list_ids: saved_list_id }, 
    })




    console.log("----Done inserting resume data.")

}





export const getSavedList = async (listID) => {

    console.log(`----Getting saved list with id: ${listID}.`)





    const db = client.db("resumes")
    const savedLists = db.collection("saved-lists")

    const savedList = await savedLists.findOne({ _id: listID })





    console.log("----Done getting saved list.")

    return savedList

}





export const updateResumeFilters = async (listID, filters) => {

    console.log(`----Updating resume filters for saved list with id: ${listID}.`)





    const db = client.db("resumes")
    const savedLists = db.collection("saved-lists")



    await savedLists.updateOne({ _id: listID }, { $set: { filters } })





    console.log("----Done updating resume filters.")

}




export const getTextScansFromBatch = async (listID) => {

    const db = client.db("resumes")

    const fileBatches = db.collection("file-batches")
    const savedLists = db.collection("saved-lists")

    const savedList = await savedLists.findOne({ _id: listID })

    const files = await fileBatches.findOne({ _id: savedList.files_id })
    const fileTextScans = files?.file_textscans

    return fileTextScans

}



export const getFiltersFromBatch = async (listID) => {
    
    const db = client.db("resumes")

    const savedLists = db.collection("saved-lists")

    const savedList = await savedLists.findOne({ _id: listID })

    return savedList.filters

}



export const updateSavedListResults = async (listID, userID, results) => {

    const db = client.db("resumes")

    const users = db.collection('users');
    const savedLists = db.collection("saved-lists")

    await savedLists.updateOne({ _id: listID }, { $set: { results } })

    await users.updateOne({ _id: userID }, { 
        $push: { saved_list_ids: listID }, 
    })

} 



export const getUserSavedLists = async (owner) => {
    
    console.log("----Getting user with userID: ${userID}'s saved lists.")





    const db = client.db("resumes");
    
    const savedLists = db.collection("saved-lists");



    const savedListsArray = await savedLists.find({ owner_of_list: { $eq: owner } }).toArray()
    


    console.log("----Done getting saved lists.")

    return savedListsArray;
    
}





export const addUser = async (userToken) => {

    console.log("----Adding user to usertable: ", userToken.id)



    

    const db = client.db('resumes');

    const users = db.collection('users');



    try {

        await users.insertOne({ _id: userToken.id, user_token: userToken, saved_list_ids: [], current_location: null, current_saved_list: null })
    
    }
    catch (error) {

        console.log("----User already registered.")
        return;

    }





    console.log("----Done adding user to user table.")

}





export const getUserSelection = async (userID) => {

    console.log("----Getting user selection for user: ", userID)



    

    const db = client.db('resumes');

    const users = db.collection('users');



    const user = await users.findOne( { _id: userID } )

    const currentSavedList = user.current_saved_list
    const location = user.current_location





    console.log("----Done getting user selection.")

    return {

        user: userID,
        currentSavedList,
        location,

    }

}





export const setUserSelection = async (userID, selection) => {
    
    console.log("----Setting user selection for user: ", userID)



    

    const db = client.db('resumes');

    const users = db.collection('users');


    
    const user = await users.findOne( { _id: userID } )

    const currentSavedList = selection.currentSavedList || user.current_saved_list
    const location = selection.location || user.current_location



    if(location && location !== null) {
        await users.updateOne({ _id: userID }, { $set: { current_location: location } })
    }

    if(currentSavedList && currentSavedList !== null) {
        await users.updateOne({ _id: userID }, { $set: { current_saved_list: currentSavedList } }) 
    }


    


    console.log("----Done setting user selection.")

}





export const addSavedList = async (userID, savedList) => {

    const db = client.db('resumes');

    const users = db.collection('users');
    const savedLists = db.collection("saved-lists");


    
    if(await savedLists.findOne({ _id: savedList._id })) {

        console.log("thing thing", savedList._id)

        await savedLists.updateOne({ _id: savedList._id }, {$set: {
            
            name_of_list: savedList.name,
            description_of_list: savedList.description, 
            color: savedList.color,
            results: savedList.results

        }})

        return;

    }



    await users.updateOne({ _id: userID }, { $push: { saved_list_ids: savedList._id } })

    const filters = []

    for(const result in savedList.results) {
        for(const score in result.scores) {
            filters.push(score.filter)
        }
    }

    await savedLists.insertOne({ 
        _id: savedList._id, 
        owner_of_list: savedList.owner_of_list,
        users_with_access: savedList.users_with_access, 
        name_of_list: savedList.name,
        description_of_list: savedList.description, 
        files_id: crypto.randomUUID(),
        color: savedList.color,
        filters: filters,
        results: savedList.results
    })


}





export const removeSavedList = async (saved_list_id) => {
    
    const db = client.db('resumes');

    const savedLists = db.collection("saved-lists");

    savedLists.deleteMany({_id: saved_list_id})
}