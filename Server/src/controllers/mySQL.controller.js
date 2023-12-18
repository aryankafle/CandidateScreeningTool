import { testDatabaseConnection } from "../models/services/MySQL.service.js"

export const testMySQLDatabaseConnection = async (req, res) => {
    testDatabaseConnection() ? console.log("MYSQL: Connected to Database") : console.log("Error Connecting to Database")
    return testDatabaseConnection() ? res.status(200).send({message: "Connected to Database"}) : res.status(404).send({message: "Error Connecting to Database"})
}