import { fileBuckets } from "../../database/MongoDB.database.js"





export const uploadFile = async (file, textScan, listID, userID) => {

    const newIndex = (await fileBuckets.find({"metadata.from_saved_list": listID}).toArray()).length

    const file_id = `${listID}@${newIndex}`
    const file_name = file.originalname
    const text_scan = textScan



    const CHUNK_SIZE = 65536 // 2^16

    streamifier
    .createReadStream(file.buffer)
    .pipe(fileBucket.openUploadStream(
        file_name,
        {
            _id: file_id,
            chunkSizeBytes: CHUNK_SIZE,
            metadata: {
                from_saved_list: _id,
                file_name,
                text_scan,
                result: null,
                user_id: userID
            }
        }
    ))

    return file_id

}



export const downloadFile = async (fileID) => {

    const file = await fileBuckets.findOne({ _id: fileID })



    if(file === null) throw { error: `A file with id: ${fileID} does not exist.` }

    return file

}



export const deleteFile = async (fileID) => {

    fileBuckets.deleteOne({_id: fileID})

}



export const changeResultOfFile = async (fileID, result) => {

    await fileBuckets.updateOne( {_id, fileID}, { $set: result } )

}