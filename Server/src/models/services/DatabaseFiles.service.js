import { fileBuckets } from "../../database/MongoDB.database.js"
import { ObjectId } from "mongodb" 
import streamifier from "streamifier"




export const uploadFile = async (file, textScan, listID, userID) => {

    const uploadsFromSameList = await fileBuckets.find({"metadata.from_saved_list": listID}).toArray()
    const newIndex = uploadsFromSameList.length

    const file_id = new ObjectId(`${listID}@${newIndex}`)
    const file_name = file.originalname
    const text_scan = 
    
    console.log(file_id)



    const CHUNK_SIZE = 65536 // 2^16

    streamifier
    .createReadStream(file.buffer)
    .pipe(fileBuckets.openUploadStream(
        file_name,
        {
            _id: file_id,
            chunkSizeBytes: CHUNK_SIZE,
            metadata: {
                from_saved_list: listID,
                file_name,
                text_scan,
                result: null,
                user_id: userID
            }
        }
    ))

    return file_id

}





export const changeResultOfFile = async (fileID, result) => {

    await fileBuckets.updateOne( {_id, fileID}, { $set: result } )

}