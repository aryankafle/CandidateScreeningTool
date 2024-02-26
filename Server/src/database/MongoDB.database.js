import { isConnected, connection } from "../inits/MongoDB.init.js"




try {
    connection()
}
catch (error) {
    console.log("Error Connecting to MongoDb: ", error)
}

export const checkMongoDBConnection = () => {
    return isConnected
}