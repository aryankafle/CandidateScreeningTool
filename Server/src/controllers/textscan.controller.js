import {pdfToPng} from 'pdf-to-png-converter'
import { createWorker } from 'tesseract.js';
//import pdf from "../../../example.pdf"
import fs from "fs"
//console.log(pdf)
const buff =  fs.readFileSync("./example.pdf")
export const convertPdfToImg = async (req, res) => {
    const pngPage = await pdfToPng(buff, {
        pagesToProcess: [1],
        viewportScale: 2.0,
    });
    console.log(pngPage[0].content)
    const worker = await createWorker('eng');
    const ret = await worker.recognize(pngPage[0].content)
    // console.log(ret.data.text);
    // setResponse(ret.data.text)
    await worker.terminate();
    return res.status(200).send({message:ret.data.text})

}
// export const scantext = async (req, res) => {
//     const worker = await createWorker('eng');
//             const ret = await worker.recognize(req.query.message)
//             // console.log(ret.data.text);
//             // setResponse(ret.data.text)
//             await worker.terminate();
//             return ret.data.text;
// }