import { fileBuckets, fileMetadata } from "../../database/MongoDB.database.js"
import { ObjectId } from "mongodb"
import streamifier from "streamifier"




export const uploadFile = async (file, textScan, userID) => {

    const file_name = file.originalname
    const file_id = new ObjectId()
    const text_scan = textScan



    const CHUNK_SIZE = 65536 // 2^16

    streamifier
    .createReadStream(file.buffer)
    .pipe(fileBuckets.openUploadStream(
        file_name,
        {
            id: file_id,
            chunkSizeBytes: CHUNK_SIZE,
            metadata: {
                file_name,
                text_scan,
                result: null,
                user_id: userID
            }
        }
    ))

    return file_id

}



export async function downloadFileMetadata(fileID) {

    const _id = new ObjectId(fileID)

    const file = await fileMetadata.findOne( { _id } )
    
    if(!file) return undefined

    return file.metadata

}

export async function downloadFileReadStream(fileID) {

    const stream = fileBuckets.openDownloadStream( fileID )

    if(!stream) return undefined

    return stream

}





export const changeResultOfFile = async (fileID, result) => {

    const _id = new ObjectId(fileID)

    await fileMetadata.updateOne({ _id }, { $set : { "metadata.result": result } } )

}





export async function deleteFile(fileID) {

    await fileBuckets.deleteMany( { _id: fileID } )

    await savedLists.updateMany( {}, { $pull: { file_ids : listID } } )

}