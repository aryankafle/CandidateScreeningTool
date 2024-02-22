import {pdfToPng} from 'pdf-to-png-converter'
import { createWorker } from 'tesseract.js';
import WordExtractor from "word-extractor"
export const convertPdfToImg = async (fileArray) => {
    //console.log("the files", fileArray)
    
    //console.log("the buffer", buffer)
    var returnArr = [];
    try {
        for (i = 0; i < fileArray.length; i++){
            switch(fileArray[i].mimetype){
                case "application/pdf":
                    const pngPage = await pdfToPng(fileArray[i].buffer, {
                        pagesToProcess: [1],
                        viewportScale: 2.0,
                    });
                    const worker = await createWorker('eng');
                    const ret = await worker.recognize(pngPage[0].content)
                    await worker.terminate();
                    const pdfFile = {
                        text: ret,
                        fileName: fileArray[i].originalname
                    }
                    returnArr.push(pdfFile)
                    break;
                    //currently only processes 1 page resumes btw 
                case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
                    //yada yada i put word 2 text processing code in here 
                    const extractor = new WordExtractor()
                    const extracted = extractor.extract(fileArray[i].buffer)
                    const text = (await extracted).getBody()
                    const wordFile = {
                        text: text,
                        fileName: fileArray[i].originalname
                    }
                    returnArr.push(pdfFile)
                    break;
            }
        }
        return returnArr;
    } catch (error) {
        console.log("grrr,", error)
        return null;
    }
}