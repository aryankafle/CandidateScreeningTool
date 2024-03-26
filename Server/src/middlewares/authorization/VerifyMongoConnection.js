import { testMongoDBConnection } from "../../models/services/MongoDB.service.js";





export const verifyMongoDbConnection = (req, res, next) => {

    if(!testMongoDBConnection()) {

        return res.status(500).send("MongoDb Server is not connected.")

    }
    
    next()

}