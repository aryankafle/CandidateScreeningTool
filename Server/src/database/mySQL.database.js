import mySQL from "mysql2"
import mySQLConfig from "../config/mysql.config.js"

const connection = await mySQL.createConnection(mySQLConfig.db)
connection.connect(( err ) => {
    if(err) {
        console.log("MySQL Connection Error: Could not connect to database from server. The following error was thrown: ", err)
    } else {
        console.log("MySQL succesfully connected to server.")
    }
})

export default connection;