import { fileBuckets, fileMetadata, savedLists } from "../../database/MongoDB.database.js"
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


export async function deleteUnusedFileIDs(){

    const fileIdArray = await fileMetadata.find({}, {_id: 1}).map(doc => doc._id).toArray()
    const savedListArray = await savedLists.find({}, {_id: 1}).map(doc => doc.file_ids).toArray()
    const deletionIdArray = []

    if (fileIdArray.length > 0){

        fileIdArray.forEach(fileIdElement => {

            var includes = false;

            savedListArray.forEach(savedListElement => {
                
                if (savedListElement.includes(fileIdElement.toString())){
                    
                    includes = true;
                }

            });
            if (!includes){

                deletionIdArray.push(fileIdElement)
                
            }
        });
    

        if (deletionIdArray.length > 0 ){
            deletionIdArray.forEach(deletionIdElement => {
                deleteSingleFileMetaData(deletionIdElement) 
            });
        }
    }

    
}


export const changeResultOfFile = async (fileID, result) => {

    const _id = new ObjectId(fileID)

    await fileMetadata.updateOne({ _id }, { $set : { "metadata.result": result } } )

}





export async function deleteFile(fileID) {

    await fileBuckets.deleteMany( { _id: fileID } )

    await savedLists.updateMany( {}, { $pull: { file_ids : listID } } )

}

export async function deleteSingleFileMetaData(fileID) {

    await fileMetadata.deleteOne({_id: fileID})

}