import { useSQL, viewSQL } from "../../database/mysql.util.js"

import { checkDatabaseConnection } from  "../../database/mysql.database.js"

export const testDatabaseConnection = () => {
    return checkDatabaseConnection
}