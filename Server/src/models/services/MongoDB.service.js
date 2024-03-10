import * as database from '../../database/MongoDB.database.js'; 
import { client } from '../../inits/MongoDB.init.js'
import { getResultsFromFilesWithFilters } from './TextToResponse.service.js';





export const testMongoDBConnection = () => {

    return database.checkMongoDBConnection()

}





export const viewTable = async () => {

    const db = client.db("resumes")
    const coll = db.collection("example_list")

    await coll.find().toArray()

}





export const uploadNewSavedList = async (original_files, file_textscans, saved_list_id, userID) => {

    console.log("----Inserting resume data.")





    const db = client.db("resumes")

    const users = db.collection("users")
    const fileBatches = db.collection("file-batches")
    const savedLists = db.collection("saved-lists")



    const filesID = crypto.randomUUID()

    try{

    await fileBatches.insertOne({ _id: filesID, original_files, file_textscans })

    await savedLists.insertOne({ 
        _id: saved_list_id, files_id: filesID, user_id: userID,
        filters: [], isFiltered: false, timesFiltered: 0, results: [] 
    })



    await users.updateOne({ _id: userID }, { 
        $push: { saved_list_ids: saved_list_id }, 
        $set: { current_saved_list: saved_list_id }
    })
    }
    catch (error) {
        console.log("errorrorr", error)
    }




    console.log("----Done inserting resume data.")

}





export const getSavedList = async (listID) => {

    console.log(`----Getting saved list with id: ${listID}.`)





    const db = client.db("resumes")
    const savedLists = db.collection("saved-lists")

    const savedListsArray = await savedLists.findOne({ _id: listID })





    console.log("----Done getting saved list.")

    return savedListsArray

}





export const updateResumeFilters = async (listID, filters) => {

    console.log(`----Updating resume filters for saved list with id: ${listID}.`)





    const db = client.db("resumes")
    const savedLists = db.collection("saved-lists")



    await savedLists.updateOne({ _id: listID }, { $set: { filters } })





    console.log("----Done updating resume filters.")

}





export const filterResumes = async (listID) => {

    console.log(`----Filtering resumes for saved list with id ${listID}.`)





    const db = client.db("resumes")

    const fileBatches = db.collection("file-batches")
    const savedLists = db.collection("saved-lists")



    const batch = await savedLists.findOne({ _id: listID })
    const batchID = batch.files_id

export const getDefaultResumeObjects = async (userToken) => {

    console.log("----Getting resume objects.")





    const db = client.db("resumes")
    const coll = db.collection("example_list")

    const docArray = await coll.find({userToken: userToken}).toArray()





    console.log("----Done getting resume objects.")

    return docArray

}


    const files = await fileBatches.findOne({ _id: batchID })
    const fileTextScans = files?.file_textscans

    console.log(batch.filters)



    const results = await getResultsFromFilesWithFilters(fileTextScans, batch.filters)



    savedLists.updateOne({ _id: listID }, { $set: { results } })





    console.log("----Finished filtering resumes.")

}





export const getUserSavedLists = async (userID) => {
    
    console.log("----Getting user with userID: ${userID}'s saved lists.")





    const db = client.db("resumes");
    
    const savedLists = db.collection("saved_lists");



    const savedListsArray = savedLists.find({ user_id: userID }).toArray()





    console.log("----Done getting saved lists.")

    return savedListsArray;
    
}





export const addUser = async (userToken) => {

    console.log("----Adding user to usertable: ", userToken.id)



    

    const db = client.db('resumes');

    const users = db.collection('users');



    try {

        await users.insertOne({ _id: userToken.id, user_token: userToken, saved_list_ids: [], current_saved_list: null })
    
    }
    catch (error) {

        console.log("----User already registered.")
        return;

    }





    console.log("----Done adding user to user table.")

}