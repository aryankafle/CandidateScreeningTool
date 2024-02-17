import { testMongoDBConnection } from "../models/services/MongoDB.service.js";
import { viewTable, insertResumeData } from "../models/services/MongoDB.service.js";


export const testMongoDatabaseConnection = async (req, res) => {
    testMongoDBConnection() ? console.log("MONGODB: Connected to Database") : console.log("Error Connecting to Database")
    return testMongoDBConnection() ? res.status(200).send({message: "Connected to Database"}) : res.status(404).send({message: "Error Connecting to Database"})
}

export const viewCommentsTable = async (req, res) => {
    testMongoDBConnection() ? viewTable() : console.log("error")
    insertResumeData('Jack', 12, 'ex')
    return viewTable() ? res.status(200).send({message: "Printed table in console"}) : res.status(404).send({message: "Error querying data"})
}