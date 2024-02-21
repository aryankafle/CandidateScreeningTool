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

        const worker = await createWorker('eng');
        const ret = await worker.recognize(pngPage[0].content)
        await worker.terminate();

        return res.status(200).send({message:ret.data.text})
    } catch (error) {
        console.log("fuckm,", error)
    }


    return res.status(200)
}