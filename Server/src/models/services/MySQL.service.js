import dbConnection from "../../database/MySQL.database.js"

export const connectDatabase = async () => {
    console.log(!!dbConnection)
    return dbConnection
}