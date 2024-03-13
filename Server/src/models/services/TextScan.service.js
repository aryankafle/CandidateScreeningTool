import {pdfToPng} from 'pdf-to-png-converter'
import { createWorker } from 'tesseract.js';
import WordExtractor from "word-extractor"





export const convertFilestoText = async (fileArray) => {

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
            
            case "image/png":

                const pngText = await changePngToText(file)
                returnArr.push(pngText)

                break;

            default: 

                throw new Error(`Error converting file to text: File ${file.originalname} is not of a valid document type. It is of type ${file.mimetype}, which cannot be processed.`)
        
        }





        console.log(`------Done converting ${file.originalname}:`)

    }


    


    console.log(`----Converted ${fileArray.length} files to text.`)

    return returnArr;

}



// only does one page i think?
async function changePdfToText(pdfFile) {
    
    const pngPage = await pdfToPng(pdfFile.buffer, {
        viewportScale: 2.0,
    });
    let allFileString = ""
    for (let i = 0; i < pngPage.length; i++){
        const worker = await createWorker('eng');
        const ret = await worker.recognize(pngPage[i].content)
        await worker.terminate();
        allFileString = allFileString.concat(ret.data.text)
    }
    
    const fileText = {
        text: allFileString,
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