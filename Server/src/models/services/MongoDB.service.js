import * as database from '../../database/MongoDB.database.js'; 

export const testMongoDBConnection = () => {
    return database.checkDatabaseConnection()
}