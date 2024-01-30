import connection from "./init/MongoDB.init.js"
import { isConnected } from "./init/MongoDB.init.js"

connection()

export const checkMongoDBConnection = () => {
    return isConnected
}