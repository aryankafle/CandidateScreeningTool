import { useSQL, viewSQL, checkDatabaseConnection } from "../../database/sql.util.js"

export const connectDatabase = () => {
    return checkDatabaseConnection
}

export const addRow = (row, table) => {
    
}

export const addColumn = (row, table) => {
    
}

export const addRow = (row, table) => {
    
}


export const removeFromDatabase = (table, colum, row, object) => {

}

export const viewDabase = () => {
    return viewSQL(null, null)
}

export const viewTable = async () => {
    return viewSQL(null, null)
}
