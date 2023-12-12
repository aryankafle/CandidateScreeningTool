import { connectDatabase } from "../models/services/MySQL.service.js"

export const testDatabaseConnection = async (req, res) => {
    return connectDatabase() ? res.status(200).send({message: "Connected to Database"}) : res.status(404).send({message: "Error Connecting to Database"})
}