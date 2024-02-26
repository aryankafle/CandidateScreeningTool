import {pdfToPng} from 'pdf-to-png-converter'
import { createWorker } from 'tesseract.js';
import WordExtractor from "word-extractor"





export const convertFiletoText = async (fileArray) => {

    console.log(`----Converting ${fileArray.length} files to text.`)
    




    var returnArr = [];

    for (var i = 0; i < fileArray.length; i++){

        const file = fileArray[i]

        console.log(`------Converting ${file.originalname} to text.`)




        
        switch(file.mimetype){

            case "application/pdf":
                
                const pdfText = await changePdfToText(file)
                returnArr.push(pdfText)

                break;
            
            case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":

                const wordText = await changeWordToText(file)
                returnArr.push(wordText)

                break;
            
            default: 

                throw new Error(`Error converting file to text: File ${file.originalname} is not of a valid document type. It is of type ${file.mimetype}, which cannot be processed.`)
        
        }





        console.log(`------Done coneverting ${file.originalname}:`)

    }


    


    console.log(`----Converted ${fileArray.length} files to text.`)

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