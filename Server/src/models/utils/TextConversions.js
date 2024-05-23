import { createWorker } from 'tesseract.js';
import WordExtractor from "word-extractor"
import { convertPdfStreamToPngBuffers, streamToBuffer } from "./FileConversions.js"





export async function changePdfStreamToText(pdfStream) {

    const pngs = await convertPdfStreamToPngBuffers(pdfStream)

    let totalText = ""

    await Promise.all(
        
        pngs.map( async (png) => totalText += await changePngBufferToText(png) ) 
    
    )

    return totalText

}





export async function changeWordStreamToText(wordStream) {

    const buffer = streamToBuffer(wordStream)

    const extractor = new WordExtractor()

    const extractionResult = await extractor.extract(buffer)

    const extractedText = extractionResult.getBody()    

    return extractedText

}





export async function changePngStreamToText(pngStream) {

    const buffer = streamToBuffer(pngStream)

    const worker = await createWorker('eng');
    
    const dataFromWorker = ( await worker.recognize(buffer) ).data

    await worker.terminate();

    return dataFromWorker.text

}





export async function changePngBufferToText(pngBuffer) {

    const worker = await createWorker('eng');
    
    const dataFromWorker = ( await worker.recognize(pngBuffer) ).data

    await worker.terminate();

    return dataFromWorker.text

}