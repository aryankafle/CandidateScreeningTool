import * as database from '../../database/MongoDB.database.js'; 
import {connection, client} from '../../inits/MongoDB.init.js'

export const testMongoDBConnection = () => {
    return database.checkMongoDBConnection()
}

// code writes complete content of 1 table (comments) into console
export const viewTable = async () => {
    const db = client.db("sample_mflix")
    const coll = db.collection("comments")
    const cursor = coll.find()
    //await cursor.forEach(console.log)
}

export const insertResumeData = async (fileFormData, listID, userToken) => {
    const db = client.db("resumes")
    const coll = db.collection("example_list")
    const doc = [{
            userToken: userToken, 
            listID: listID, 
            fileFormData: fileFormData,
            filters: [],
            filteredResults: null
        }];
    const result = await coll.insert(doc);
    console.log(result.insertedIds);
}