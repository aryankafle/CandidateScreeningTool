import { isConnected } from "../../database/MongoDB.database.js";





export const verifyMongoDbConnection = (req, res, next) => {

    if(!isConnected()) {

        return res.status(500).send("MongoDb Server is not connected.")

    }
    
    next()

}