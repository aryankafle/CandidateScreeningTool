import mongoConfig from "../config/MongoDB.config.js"
import { MongoClient, GridFSBucket, ObjectId } from 'mongodb';
import config from "../config/env.config.js";





export var isConnected = false;

export const client = new MongoClient(config.MONGODB_ACCESS_URI, mongoConfig);



export const connection = async () => {
    
  await client.connect();
    
  await client.db("admin").command({ ping: 1 });
  
  isConnected = true

  console.log("MongoDB Connected.");

  return isConnected

}



try {
  
  connection()

}
catch(error) {

  await client.close()
  console.trace("Erorr connecting to MongoDB: ", error)

}





export const resumeDB = client.db("resumes")

export const fileBuckets = new GridFSBucket(resumeDB, { bucketName: "files"})
export const fileMetadata = resumeDB.collection("files.files")
export const users = resumeDB.collection("users")
export const savedLists = resumeDB.collection("saved-lists")