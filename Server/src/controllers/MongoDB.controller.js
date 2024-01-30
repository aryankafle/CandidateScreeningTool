import { testMongoDBConnection } from "../models/services/MongoDB.service.js";


export const testMongoDatabaseConnection = async (req, res) => {
    testMongoDBConnection() ? console.log("MONGODB: Connected to Database") : console.log("Error Connecting to Database")
    return testMongoDBConnection() ? res.status(200).send({message: "Connected to Database"}) : res.status(404).send({message: "Error Connecting to Database"})
}

