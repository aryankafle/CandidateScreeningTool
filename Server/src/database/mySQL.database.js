import mySQL from "mysql2"
import mySQLConfig from "../config/mysql.config.js"

const connection = await mySQL.createConnection(mySQLConfig.db)
connection.connect((err ) => {
    return err
})

export default connection;