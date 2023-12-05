import dbConnection from "../../database/mySQL.database.js"

export async function connectDatabase(sql, params) {

    return dbConnection
}