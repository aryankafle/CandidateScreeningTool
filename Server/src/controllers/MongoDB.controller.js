import { filterResumes, getResumeResults, testMongoDBConnection, updateResumeFilters } from "../models/services/MongoDB.service.js";
import { insertResumeData } from "../models/services/MongoDB.service.js";
import { convertPdfToImg } from "../models/services/TextScan.service.js";


export const testMongoDatabaseConnection = async (req, res) => {
    testMongoDBConnection() ? console.log("MONGODB: Connected to Database") : console.log("Error Connecting to Database")
    return testMongoDBConnection() ? res.status(200).send({message: "Connected to Database"}) : res.status(404).send({message: "Error Connecting to Database"})
}

export const uploadResumesToDB = async (req, res, listID, userToken) => {
    if (testMongoDBConnection()) {
        const images = convertPdfToImg(req.files)
        images.forEach(element => {
            insertResumeData(element, listID, userToken)
        });
    } else {
        console.log("Error connecting to db")
    }
}

export const applyFiltersToResumes = async (listID, userToken) => {
    if (testMongoDBConnection()) {
        filterResumes(listID, userToken)
    } else {
        console.log("error connecting to DB")
    }
}

export const getResumeList = async (listID, userToken) => {
    if (testMongoDBConnection()) {
        getResumeResults(listID, userToken);
    } else {
        console.log("error connecting to DB")
    }
}

export const updateFilters = async (listID, userToken, filters) => {
    if (testMongoDBConnection()) {
        updateResumeFilters(listID, userToken, filters);
    } else {
        console.log("error connecting to DB")
    }
}