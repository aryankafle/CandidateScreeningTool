import { isConnected, connection } from "../inits/MongoDB.init.js"





connection()

export const checkMongoDBConnection = () => {
    return isConnected
}