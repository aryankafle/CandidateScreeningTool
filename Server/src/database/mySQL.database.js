import mySQL from "mysql2"
import mySQLConfig from "../config/mysql.config.js"

const connection = await mySQL.createConnection(mySQLConfig.db)
connection.connect(( err ) => {
    if(err) {
        console.log("MySQL: Connection error: Could not connect to database from server. The following error was thrown: ", err)
    } else {
        console.log("MYSQL: Succesfully connected to server.")
    }
})

export default connection;

export const checkDatabaseConnection = () => {
    return !!dbConnection
}

export const addRow = (row, table) => {
    
}

export const addColumn = (column, table) => {
    
}

export const addItem = (row, column, table) => {
    
}


export const removeRow = (table, colum, row, object) => {

}

export const removeColumn = () => {

}

export const removeItem = () => {
    
}

export const viewDabase = () => {
    return viewSQL(null, null)
}

export const viewTable = async () => {
    return viewSQL(null, null)
}
