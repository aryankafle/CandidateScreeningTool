import dbConnection from "../database/MySQL.database.js"

export const testDatabaseConnection = async (req, res) => {
    return dbConnection ? res.json({message: "Connected to Database"}) : res.json({message: "Error Connecting to Database"})
}