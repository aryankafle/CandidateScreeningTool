import {pdfToPng} from 'pdf-to-png-converter'
import { createWorker } from 'tesseract.js';
import fs from "fs"

const buff2 = fs.readFileSync("./Stats.pdf")
export const convertPdfToImg = async (req, res) => {

    console.log("the files", req.files)
    const buffer = req.files[0].buffer

    console.log("the buffer", buffer)

    try {
        const pngPage = await pdfToPng(buffer, {
            pagesToProcess: [1],
            viewportScale: 2.0,
        });
        //mimetype to determine file type stuff
        //array of jsons with name, filename, text string (return)

        //one function that runs this pdf stuff and sends to database
        //one function that makes database request for that json 
        //give user + filters, then get everything in database under user
        //get user + list + filters and send thru open ai
        //func that takes list of resumes (object stuff) (service function) and list of filters??
        //run throughh openai and return response (string/json)
        const worker = await createWorker('eng');
        const ret = await worker.recognize(pngPage[0].content)
        await worker.terminate();

        return res.status(200).send({message:ret.data.text})
    } catch (error) {
        console.log("Error", error)
    }


    return res.status(200)
}