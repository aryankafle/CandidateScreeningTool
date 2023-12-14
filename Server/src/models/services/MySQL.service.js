import { useSQL, viewSQL, checkDatabaseConnection } from "../../database/sql.util.js"

export const connectDatabase = async () => {
    return checkDatabaseConnection
}

export const addToDatabase = async () => {
    
}

export const viewDabase = async () => {
    return viewSQL(null, null)
}
