import { fileBuckets, fileMetadata, savedLists } from "../../database/MongoDB.database.js"
import { ObjectId } from "mongodb"





export async function downloadFileMetadata(fileID) {

    const _id = new ObjectId(fileID)

    const file = await fileMetadata.findOne( { _id } )
    
    if(!file) return undefined

    return file.metadata

}

export async function changeFileTextscan(fileID, text_scan) {

    const _id = new ObjectId(fileID)

    await fileMetadata.updateOne( { _id }, { $set: { "metadata.text_scan": text_scan } } )

}

export async function changeFileContactInfo(fileID, contact_info) {

    const _id = new ObjectId(fileID)

    await fileMetadata.updateOne( { _id }, { $set: { "metadata.contact_info": contact_info } } )

}

export async function downloadFileReadStream(fileID) {

    const _id = new ObjectId(fileID)

    const stream = fileBuckets.openDownloadStream( _id )

    if(!stream) return undefined
    
    return stream

}

export async function downloadFileFilters(fileID) {

    const _id = new ObjectId(fileID)

    const file = await fileMetadata.findOne( { _id } )
    
    if(!file) return undefined

    return file.metadata.results.filters

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


export const addResultToFile = async (fileID, from_saved_list, result) => {

    const _id = new ObjectId(fileID)

    await fileMetadata.updateOne({ _id }, { $push : { "metadata.results": {result} }, $push : { "metadata.from_saved_list": {from_saved_list} } } )

}





export async function deleteFile(fileID) {

    await fileBuckets.deleteMany( { _id: fileID } )

    await savedLists.updateMany( {}, { $pull: { file_ids : listID } } )

}

export async function deleteSingleFileMetaData(fileID) {

    await fileMetadata.deleteOne({_id: fileID})

}
