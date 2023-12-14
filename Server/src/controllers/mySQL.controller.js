import { connectDatabase } from "../models/services/MySQL.service.js"

export const testDatabaseConnection = async (req, res) => {
    connectDatabase() ? console.log("MYSQL: Connected to Database") : console.log("Error Connecting to Database")
    return connectDatabase() ? res.status(200).send({message: "Connected to Database"}) : res.status(404).send({message: "Error Connecting to Database"})
}