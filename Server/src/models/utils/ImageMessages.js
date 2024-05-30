import WordExtractor from "word-extractor";





export function getImagesContextMsg(imageBuffers) {

    if(imageBuffers.length < 1) throw Error("Image buffers must exist!")



    const declarationMessage = imageBuffers.length === 1 ? "This is a image of the resume: " : "These are images of the pages of the resume:"

    const content = []

    content.push({ type: "text", text: declarationMessage })



    for(const buffer of imageBuffers) {

        const imageObj = { 
            type: "image_url",
            image_url: {
                url: `data:image/jpeg;base64,${buffer.toString('base64')}`
            }
        }



        content.push(imageObj)

    }





    const message = {

        role: "user",
        content

    }

    return message

}



export async function getImageMessageFromDocx(docxBuffer) {

    const extractor = new WordExtractor()

    const extractionResult = await extractor.extract(docxBuffer)

    const extractedText = extractionResult.getBody()    

    const message = {

        role: "user",
        content: [
            { type: "text", text: `This is the text extracted from a word document of the resume: ` },
            { type: "text", text: extractedText }
        ],

    }
    
    return message

}