import * as database from '../../database/MongoDB.database.js'; 
import {connection, client} from '../../inits/MongoDB.init.js'

export const testMongoDBConnection = () => {
    return database.checkMongoDBConnection()
}

// code writes complete content of 1 table (comments) into console
export const viewTable = async () => {
    await connection()
    const db = client.db("sample_mflix")
    const coll = db.collection("comments")
    const cursor = coll.find()
    await cursor.forEach(console.log)
}