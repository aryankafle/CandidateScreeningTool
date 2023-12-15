import * as database from 'database/mysql.database.js'; 

export const testDatabaseConnection = () => {
    return database.checkDatabaseConnection()
}