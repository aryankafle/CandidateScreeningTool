import { GridFSBucket } from 'mongodb';
// import * as database from '../../database/MongoDB.database.js'; 
// import { client } from '../../inits/MongoDB.init.js'
import crypto from "crypto"
import streamifier from "streamifier"





export const uploadNewSavedList = async (original_files, file_textscans, _id, name_of_list, owner_of_list) => {

    console.log("----Inserting resume data.")





    const db = client.db("resumes")

    const fileBucket = new GridFSBucket(db, {bucketName: "file-buckets"})
    const users = db.collection("users")
    const savedLists = db.collection("saved-lists")



    const file_ids = []

    original_files.map((file, index) => {

        const CHUNK_SIZE = 65536 // 2^16

        const file_id = `${_id}@${index}`
        const file_name = file.originalname
        const text_scan = file_textscans[index]

        file_ids.push(file_id)



        streamifier
        .createReadStream(file.buffer)
        .pipe(fileBucket.openUploadStream(
            file_name,
            {
                _id: file_id,
                chunkSizeBytes: CHUNK_SIZE,
                metadata: {
                    from_saved_list: _id,
                    file_name,
                    text_scan
                }
            }
        ))

    })

    

    await savedLists.insertOne({ 
        
        _id, 
        file_ids,



        owner_of_list,
        users_with_access: [], 

        name_of_list,
        description_of_list : "",
        color_of_list: "", 



        filters: [],
        results: [],

    })



    await users.updateOne({ _id: owner_of_list }, { 
        $push: { saved_list_ids: _id }, 
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

    const files = db.collection("file-buckets.files")

    const textScans = ( await 
        (
            files.find({"metadata.from_saved_list": listID})
            .project({ metadata: 1 })
        )
        .toArray()
    ).map(file => file.metadata.text_scan)

    const fileTextScans = textScans

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


export const addSavedList = async (userID, savedList) => {

    const db = client.db('resumes');

    const users = db.collection('users');
    const savedLists = db.collection("saved-lists");


    
    if(await savedLists.findOne({ _id: savedList._id })) {

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
        file_ids: [],

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