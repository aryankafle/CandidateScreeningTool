import {pdfToPng} from 'pdf-to-png-converter'
import { createWorker } from 'tesseract.js';
import WordExtractor from "word-extractor"





export const convertFiletoText = async (fileArray) => {
    
    var returnArr = [];

    for (var i = 0; i < fileArray.length; i++){
        
        switch(fileArray[i].mimetype){

            case "application/pdf":
                
                const pdfText = await changePdfToText(fileArray[i])
                returnArr.push(pdfText)

                break;
            
            case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":

                const wordText = await changeWordToText(fileArray[i])
                returnArr.push(wordText)
            
            default: 

                throw new Error(`Error converting file to text: File ${fileArray[i].fileName} is not of a valid document type. It is of type ${fileArray[i].mimetype}, which cannot be processed.`)
        
            }

    }


    
    return returnArr;

}



async function changePdfToText(pdfFile) {
    
    const pngPage = await pdfToPng(pdfFile.buffer, {
        pagesToProcess: [1],
        viewportScale: 2.0,
    });



    const worker = await createWorker('eng');
    const ret = await worker.recognize(pngPage[0].content)

    await worker.terminate();
    

    
    const fileText = {
        text: ret.data.text,
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