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
    const docs = [
        {userToken: userToken, listID: listID, fileFormData: fileFormData}
      ];
    const result = await coll.insertMany(docs);
    console.log(result.insertedIds);
}