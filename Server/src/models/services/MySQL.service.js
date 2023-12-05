import dbConnection from "../../database/mySQL.database.js"

export async function connectDatabase(sql, params) {
    const connection = await mysql.createConnection(dbConfig.db)
    connection.connect((err ) => {
        return err
    })

    return "Connecte to database"
}