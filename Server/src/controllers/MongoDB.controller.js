import { filterResumes, getResumeResults, testMongoDBConnection, updateResumeFilters } from "../models/services/MongoDB.service.js";
import { insertResumeData } from "../models/services/MongoDB.service.js";
import { convertFiletoText } from "../models/services/TextScan.service.js";


export const testMongoDatabaseConnection = async (req, res) => {
    testMongoDBConnection() ? console.log("MONGODB: Connected to Database") : console.log("Error Connecting to Database")
    return testMongoDBConnection() ? res.status(200).send({message: "Connected to Database"}) : res.status(404).send({message: "Error Connecting to Database"})
}

export const uploadResumesToDB = async (req, res) => {
    console.log(`controller: uploadResumesToDb(); request: ${req}`)



    if (testMongoDBConnection()) {
        const images = await convertFiletoText(req.files)
        console.log("low images" + images[0])

        for(let i = 0; i < images.length; i++) {
            await insertResumeData(images[i], req.body?.listID, req.body?.userToken, i)
        }

        return res.status(200).json({message: "Successful Upload to Db!"})
    }
    else {
        console.log("Error connecting to db")
        return res.status(409).json({message: "Error Uploading to Db!"})
    }
}

export const applyFiltersToResumes = async (req, res) => {
    console.log(`controller: applyFiltersToResumes(); request : ${req}`)
    
    if (testMongoDBConnection()) {
        await filterResumes(req.body?.listID, req.body?.userToken)

        return res.status(200).json({message: "Successful Upload to Db!"})

    } else {
        console.log("error connecting to DB")
        return res.status(409).json({message: "Error Uploading to Db!"})
    }
}

export const getResumeList = async (req, res) => {
    console.log(`controller: getResumeList(); request: ${req}`)
    
    
    if (testMongoDBConnection()) {
        try {
            const results = await getResumeResults(req.query?.listID, req.query?.userToken)
            
            res.status(200).send(results);
        }
        catch (error) {
            console.log("getresmuelist", req.query?.listID, req.query?.userToken, error)
            res.status(200).send({})
        }
    } else {
        console.log("error connecting to DB")
        res.status(500).send({message: "Error Getting from Db!"});
    }

    console.log('9874097230479234097')
}

export const updateFilters = async (req, res) => {
    console.log(`controller: updateFilters(); request : ${req}`)

    if (testMongoDBConnection()) {
        await updateResumeFilters(req.body?.listID, req.body?.userToken, req.body?.filters);
        return res.status(200).json({message: "Successful Upload to Db!"})
    } else {
        console.log("error connecting to DB")
        return res.status(409).json({message: "Error Uploading to Db!"})
    }
}