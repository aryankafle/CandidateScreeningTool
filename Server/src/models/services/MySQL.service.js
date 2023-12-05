import dbConnection from "../../database/MySQL.database.js"

export async function connectDatabase(sql, params) {

    return dbConnection
}