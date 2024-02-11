import {pdfToPng} from 'pdf-to-png-converter'
import { createWorker } from 'tesseract.js';
import fs from "fs"

const buff =  fs.readFileSync("./example.pdf")

export const convertPdfToImg = async (req, res) => {

    const pngPage = await pdfToPng(buff, {
        pagesToProcess: [1],
        viewportScale: 2.0,
    });

    
    const worker = await createWorker('eng');
    const ret = await worker.recognize(pngPage[0].content)
    await worker.terminate();
    console.log("file text" + ret.data.text)
    return res.status(200).send({message:ret.data.text})

}