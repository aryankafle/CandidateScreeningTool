import mysql from "mysql2"
import config from "../config/mySQL-config"

export async function query(sql, paramWs) {
    const connection = await mysql.createConnection(config.db)
    const [results, ] = await connection.execute(sql, params)

    return results
}