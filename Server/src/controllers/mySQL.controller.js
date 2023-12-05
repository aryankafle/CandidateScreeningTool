import dbConnection from "../database/MySQL.database.js"

export const testDatabaseConnection = async (req, res) => {
    return dbConnection ? res.status(200).json({message: "Successfully connected to Database"}) : res.status(503).json({message: "Database service unavailable"})
}