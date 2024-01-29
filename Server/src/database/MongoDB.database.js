import mongoConfig from "../config/MongoDB.config.js"
import { MongoClient } from 'mongodb';
import dotenv from "dotenv"
dotenv.config();





const client = new MongoClient(process.env.MONGODB_ACCESS_URI, mongoConfig);

var isConnected = false;





const connection = async () => {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        isConnected = true
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
      } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
      }
}

connection()

export const checkMongoDBConnection = () => {
    return isConnected
}