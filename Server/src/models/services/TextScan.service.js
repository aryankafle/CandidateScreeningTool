import {

    changePdfStreamToText,
    changeWordStreamToText,
    changePngToText,

} from "../utils/TextConversions.js"





export async function convertFileToText(readstream, mimetype) {

    switch(mimetype){

        case "application/pdf":
            
            const pdfText = await changePdfToText(readstream)

            return pdfText
        
        case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":

            const wordText = await changeWordToText(readstream)

            return wordText
        
        case "image/png":

            const pngText = await changePngToText(readstream)

            return pngText

        default: 

            throw new Error(`File of mimetype ${mimetype} is not of a valid document type.`)
    
    }

}