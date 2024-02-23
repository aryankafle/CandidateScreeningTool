import { testMongoDBConnection } from "../models/services/MongoDB.service.js";
import { viewTable, insertResumeData } from "../models/services/MongoDB.service.js";
import { convertPdfToImg } from "./textscan.controller.js";


export const testMongoDatabaseConnection = async (req, res) => {
    testMongoDBConnection() ? console.log("MONGODB: Connected to Database") : console.log("Error Connecting to Database")
    return testMongoDBConnection() ? res.status(200).send({message: "Connected to Database"}) : res.status(404).send({message: "Error Connecting to Database"})
}

export const uploadResumesToDB = async (req, res, listID, userToken) => {
    if (testMongoDBConnection()) {
        const images = convertPdfToImg(req.files)
        insertResumeData(images, listID, userToken)
    } else {
        console.log("Error connecting to database")
    }
}