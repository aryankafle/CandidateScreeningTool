import * as database from '../../database/MongoDB.database.js'; 
import { connection, client } from '../../inits/MongoDB.init.js'
import { getResultsFromFilesWithFilters } from './TextToResponse.service.js';





export const testMongoDBConnection = () => {

    return database.checkMongoDBConnection()

}





export const viewTable = async () => {

    const db = client.db("resumes")
    const coll = db.collection("example_list")

    await coll.find().toArray()

}





export const insertResumeData = async (scannedResume, listID, userToken) => {

    console.log("----Inserting resume data.")





    const db = client.db("resumes")
    const coll = db.collection("example_list")

    const doc = {
        isFiltered: false,
        userToken: userToken, 
        listID: listID, 
        scannedResume: scannedResume,
        filters: [],
        filteredResults: []
    };



    await coll.insertOne(doc);





    console.log("----Done inserting resume data.")
}





export const updateResumeFilters = async (listID, userToken, filters) => {

    console.log("----Updating resume filters.")





    const db = client.db("resumes")
    const coll = db.collection("example_list")

    const setDocs = {
        userToken: userToken,
        listID: listID
    }

    const updateDocs = {
        $set: {
            filters: filters
        }
    }





    console.log("----Done updating resume filters.")

    await coll.updateMany(setDocs, updateDocs)

}





export const getResumeObjects = async (listID, userToken) => {

    console.log("----Getting resume objects.")





    const db = client.db("resumes")
    const coll = db.collection("example_list")

    const docArray = await coll.find({listID: listID, userToken: userToken}).toArray()





    console.log("----Done getting resume objects.")

    return docArray

}

export const getDefaultResumeObjects = async (userToken) => {

    console.log("----Getting resume objects.")





    const db = client.db("resumes")
    const coll = db.collection("example_list")

    const docArray = await coll.find({userToken: userToken}).toArray()





    console.log("----Done getting resume objects.")

    return docArray

}




export const filterResumes = async (listID, userToken) => {

    console.log("----Filtering resumes.")



    

    const db = client.db("resumes")
    const coll = db.collection("example_list")
    
    const resumeObjectArray = await getResumeObjects(listID, userToken)
    console.log(`----${resumeObjectArray.length} resumes to filter.`)

    const filteredResumeArray = await getResultsFromFilesWithFilters(resumeObjectArray)
    


    for(var i = 0; i < filteredResumeArray.length; i++) {

        await coll.updateOne({listID: listID, userToken: userToken, isFiltered: false}, {"$set": {filteredResults: filteredResumeArray[i], isFiltered: true}})
    
    }





    console.log("----Finished filtering resumes.")

}





export const getResumeResults = async (listID, userToken) => {
    
    console.log("----Getting resume reuslts.")





    const db = client.db("resumes");
    const coll = db.collection("example_list");
    
    const results = await coll.find({listID: listID, userToken: userToken, isFiltered: true}).project({filteredResults: 1}).toArray();
    




    console.log("--Done getting resume results.")

    return results.map((result) => result.filteredResults);
    
}