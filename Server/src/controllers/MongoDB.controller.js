import { filterResumes, getResumeResults, testMongoDBConnection, updateResumeFilters } from "../models/services/MongoDB.service.js";
import { insertResumeData } from "../models/services/MongoDB.service.js";
import { convertPdfToImg } from "../models/services/TextScan.service.js";


export const testMongoDatabaseConnection = async (req, res) => {
    testMongoDBConnection() ? console.log("MONGODB: Connected to Database") : console.log("Error Connecting to Database")
    return testMongoDBConnection() ? res.status(200).send({message: "Connected to Database"}) : res.status(404).send({message: "Error Connecting to Database"})
}

export const uploadResumesToDB = async (req) => {
    if (testMongoDBConnection()) {
        const images = await convertPdfToImg(req.files)
        console.log("low images" + images[0])
        images.forEach(element => {
            insertResumeData(element, req.listID, req.userToken)
        });
    } else {
        console.log("Error connecting to db")
    }
}

export const applyFiltersToResumes = async (req) => {
    if (testMongoDBConnection()) {
        filterResumes(req.listID, req.userToken)
        console.log(filterResumes(req.listID, req.userToken) + "heheheha")
    } else {
        console.log("error connecting to DB")
    }
}

export const getResumeList = async (req, res) => {
    if (testMongoDBConnection()) {
        console.log(getResumeResults(req.listID, req.userToken) + "grrr")
        res.status(200).send(getResumeResults(req.listID, req.userToken));
    } else {
        console.log("error connecting to DB")
    }
}

export const updateFilters = async (req) => {
    if (testMongoDBConnection()) {
        updateResumeFilters(req.listID, req.userToken, req.filters);
    } else {
        console.log("error connecting to DB")
    }
}