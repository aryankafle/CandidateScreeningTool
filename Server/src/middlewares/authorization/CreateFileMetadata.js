import { gridFS } from "../../config/MongoDB.config.js"





export const getFileMetadata = async (req, file) => {

    const metadata = {

        file_name: file.originalname,
        file_type: file.mimetype,
        text_scan: null,
        contact_info: null,
        results: [],

    }

    return {

        bucketName: gridFS.bucketName,
        metadata: metadata,
        chunkSize: gridFS.chunkSize
    
    }
    
}