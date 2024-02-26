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





export const insertResumeData = async (scannedResume, listID, userToken, index) => {

    const db = client.db("resumes")
    const coll = db.collection("example_list")

    const doc = {
        index: index,
        userToken: userToken, 
        listID: listID, 
        scannedResume: scannedResume,
        filters: [],
        filteredResults: []
    };



    await coll.insertOne(doc);

}





export const updateResumeFilters = async (listID, userToken, filters) => {

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



    await coll.updateMany(setDocs, updateDocs)

}





export const getResumeObjects = async (listID, userToken) => {

    const db = client.db("resumes")
    const coll = db.collection("example_list")

    const docArray = await coll.find({listID: listID, userToken: userToken}).toArray()



    return docArray

}





export const filterResumes = async (listID, userToken) => {

    const db = client.db("resumes")
    const coll = db.collection("example_list")
    
    const resumeObjectArray = await getResumeObjects(listID, userToken)

    const filteredResumeArray = await getResultsFromFilesWithFilters(resumeObjectArray)
    


    for(var i = 0; i < filteredResumeArray.length; i++) {

        coll.updateOne({listID: listID, userToken: userToken, index: i}, {"$set": {filteredResults: filteredResumeArray[i]}})
    
    }

}





export const getResumeResults = async (listID, userToken) => {

    const db = client.db("resumes");
    const coll = db.collection("example_list");
    
    const results = await coll.find({listID: listID, userToken: userToken}).project({filteredResults: 1}).toArray();
    


    return results.map((result) => result.filteredResults);
    
}