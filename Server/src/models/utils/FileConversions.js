import { pdf2picConfig } from '../../config/pdf2pic.config.js'
import { fromBuffer } from "pdf2pic"





export const streamToBuffer = (stream) => {

    return new Promise((resolve, reject) => {
    
        const chunks = [];

        stream.on('data', (chunk) => chunks.push(chunk));
        stream.on('end', () => resolve(Buffer.concat(chunks)));
        stream.on('error', (err) => reject(err));

    });
    
};



export const convertPdfStreamToPngBuffers = async (pdfReadStream) => {

    const pdfBuffer = await streamToBuffer(pdfReadStream);

    const convert = fromBuffer(pdfBuffer, pdf2picConfig)

    const bulk = await convert.bulk(-1, { responseType: "buffer" } )

    return bulk.map(bufferResponse => bufferResponse.buffer)

};