import mongoConfig from "../config/MongoDB.config.js"
import { MongoClient, GridFSBucket } from 'mongodb';
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
export const users = resumeDB.collection("users")
export const savedLists = resumeDB.collection("saved-lists")





export async function getUser(userID) {

  const user = await users.findOne( { _id: userID } )

  if(!user) return undefined

  return user

}



export async function getList(listID) {

  const list = await savedLists.findOne( { id: listID } )

  if(!list) return undefined

  return list

}

export async function deleteList(listID) {

  await users.updateMany( {}, { $pull: { saved_list_ids : listID } } )

  const filesToDelete = fileBuckets.find( { "metadata.from_saved_list": listID } )

  for await (const file of filesToDelete) {

    await fileBuckets.delete(file._id)

  }

  await fileBuckets.delete( {}, { saved_list_ids : { $pull: { _id : listID } } } )

  await savedLists.deleteMany( { id: listID } )

}



export async function downloadFileMetadata(fileID) {

  const file = await fileBuckets.find( { _id: fileID } ).limit(1).toArray()
  
  if(!file || !file[0]) return undefined

  return file[0]

}

export async function downloadFileReadStream(fileID) {

  const stream = fileBuckets.openDownloadStream( fileID )

  if(!stream) return undefined

  return stream

}

export async function deleteFile(fileID) {

  await fileBuckets.deleteMany( { _id: fileID } )

  await savedLists.updateMany( {}, { $pull: { file_ids : listID } } )

}