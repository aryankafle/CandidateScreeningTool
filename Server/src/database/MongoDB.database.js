import mongoConfig from "../config/MongoDB.config.js"
import { MongoClient } from 'mongodb';
import config from "../config/env.config.js";





export var isConnected = false;

export const client = new MongoClient(config.MONGODB_ACCESS_URI, mongoConfig);



export const checkMongoDBConnection = () => {
    return isConnected
}

export const connection = async () => {
    try {
      // Connect the client to the server	(optional starting in v4.7)
      await client.connect();
      // Send a ping to confirm a successful connection
      await client.db("admin").command({ ping: 1 });
      isConnected = true
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
      return isConnected
    }
    catch (err) {
      console.log(err)
      await client.close()
    }
}

connection()





export const resumeDB = client.db("resumes")

export const fileBuckets = resumeDB.collection("file-buckets.files")
export const users = resumeDB.collection("users")
export const savedLists = resumeDB.collection("saved-lists")