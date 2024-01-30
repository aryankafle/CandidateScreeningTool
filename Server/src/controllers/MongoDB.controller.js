import { testMongoDBConnection } from "../models/services/MongoDB.service.js";
import { connection, client, isConnected } from "../inits/MongoDB.init.js"

export const testMongoDatabaseConnection = async (req, res) => {
    testMongoDBConnection() ? console.log("MONGODB: Connected to Database") : console.log("Error Connecting to Database")
    return testMongoDBConnection() ? res.status(200).send({message: "Connected to Database"}) : res.status(404).send({message: "Error Connecting to Database"})
}

// export const viewTable = async() => {
//     if (isConnected) {
//         const db = client.db("sample_mflix")
//         const coll = db.coll("comments")
//         const cursor = coll.find()
//         await cursor.forEach(console.log)
//     }
// }

// viewTable()