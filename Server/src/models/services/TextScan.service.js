import {pdfToPng} from 'pdf-to-png-converter'
import { createWorker } from 'tesseract.js';
import WordExtractor from "word-extractor"





export const convertFilestoText = async (fileArray) => {

    console.log(`----Converting ${fileArray.length} files to text.`)
    




    async function getTextScanForFile(file) {

        switch(file.mimetype){

            case "application/pdf":
                
                const pdfText = await changePdfToText(file)

                return {file: file, scan: pdfText}
            
            case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":

                const wordText = await changeWordToText(file)

                return {file: file, scan: wordText}
            
            case "image/png":

                const pngText = await changePngToText(file)

                return {file: file, scan: pngText}

            default: 

                throw new Error(`Error converting file to text: File ${file.originalname} is not of a valid document type. It is of type ${file.mimetype}, which cannot be processed.`)
        
        }
    }



    const textScans = await Promise.all(fileArray.map(async (file) => { 

        const result = await getTextScanForFile(file)

        console.log(`Done getting text scan for file ${file.originalname} of type ${file.mimetype}.`)

        return result.scan

    }))





    return textScans
    
}





async function changePdfToText(pdfFile) {
    
    async function scanSinglePage (page) {

        const worker = await createWorker('eng')

        const result = await worker.recognize(page.content)

        worker.terminate()

        return result

    }

    const pngPages = await pdfToPng(pdfFile.buffer, {
        viewportScale: 2.0,
    });

    const scannedPages = await Promise.all(
        pngPages.map(
            (page) => {
                return scanSinglePage(page)
            }
    ))

    let text = ""

    scannedPages.forEach(page => {
        text += page.data.text
    });
    
    const fileText = {
        text,
        fileName: pdfFile.originalname
    }
    
    return fileText

}

async function changeWordToText(wordFile) {

    const extractor = new WordExtractor()
    const extracted = extractor.extract(wordFile.buffer)

    const text = (await extracted).getBody()
    


    const fileText = {
        text: text,
        fileName: wordFile.originalname
    }
    
    return fileText

}

async function changePngToText(pngFile) {

    const worker = await createWorker('eng');
    const ret = await worker.recognize(pngFile.buffer)

    await worker.terminate();
    

    
    const fileText = {
        text: ret.data.text,
        fileName: pngFile.originalname
    }
    
    return fileText
}