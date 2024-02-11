import { isConnected, connection } from "../inits/MongoDB.init.js"




try {
    connection()
    console.log("Successfully Connected to MongoDb.")
}
catch (error) {
    console.log("Error Connecting to MongoDb: ", error)
}

export const checkMongoDBConnection = () => {
    return isConnected
}