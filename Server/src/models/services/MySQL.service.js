import dbConnection from "../../database/MySQL.database.js"

export const connectDatabase = async () => {
    return dbConnection
}