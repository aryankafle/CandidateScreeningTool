import { pdfToPng } from 'pdf-to-png-converter'
import { createWorker } from 'tesseract.js';
import WordExtractor from "word-extractor"





export async function changePdfToText(pdfFile) {

    const pngPages = await pdfToPng(pdfFile.buffer, {
        viewportScale: 2.0,
    });

    const textScannedFromPages = await Promise.all(
        pngPages.map(
            (page) => {
                return changePngToText(page.content)
            }
    ))

    

    let totalText = ""

    textScannedFromPages.forEach(textFromPage => {
        totalText += textFromPage.text
    });

    console.log(totalText)


    


    const fileText = {
        text: totalText,
        fileName: pdfFile.originalname
    }
    


    return fileText

}





export async function changeWordToText(wordFile) {

    const extractor = new WordExtractor()

    const extractionResult = await extractor.extract(wordFile.buffer)

    const extractedText = extractionResult.getBody()
    



    
    const fileText = {
        text: extractedText,
        fileName: wordFile.originalname
    }
    


    return fileText

}





export async function changePngToText(pngFile) {

    const worker = await createWorker('eng');
    
    const dataFromWorker = ( await worker.recognize(pngFile.buffer) ).data





    const fileText = {
        text: dataFromWorker.text,
        fileName: pngFile.originalname
    }

    worker.terminate();
    


    return fileText
}