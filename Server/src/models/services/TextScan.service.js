import { changePdfToText } from "../utils/TextConversions.js"
import { changeWordToText } from "../utils/TextConversions.js"
import { changePngToText } from "../utils/TextConversions.js"





export const convertFilestoText = async (fileArray) => {

    console.log(`----Converting ${fileArray.length} files to text.`)
    




    async function getTextScanForFile(file) {

        switch(file.mimetype){

            case "application/pdf":
                
                const pdfText = await changePdfToText(file)

                return { file: file, scan: pdfText }
            
            case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":

                const wordText = await changeWordToText(file)

                return { file: file, scan: wordText }
            
            case "image/png":

                const pngText = await changePngToText(file)

                return { file: file, scan: pngText }

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