import {pdfToPng} from 'pdf-to-png-converter'
import { createWorker } from 'tesseract.js';
import fs from "fs"
//import {useContext} from "react"
const buff =  fs.readFileSync("./example.pdf")
const buff2 = fs.readFileSync("./Stats.pdf")
export const convertPdfToImg = async (req, res) => {

    //console.log(req.query.message)
    //console.log(Object.getPrototypeOf(req.query.message))
    // if (req.query.message instanceof FormData){
    //     console.log(req.query.message.name + "message")
    //     console.log("yah")
    // }
    

    //console.log(req.message.files)
    //console.log("req " + req)
    const pngPage = await pdfToPng(buff2, { //normally req.message
        pagesToProcess: [1],
        viewportScale: 2.0,
    });

    
    const worker = await createWorker('eng');
    const ret = await worker.recognize(pngPage[0].content)
    await worker.terminate();
    //console.log("file text" + ret.data.text)
    return res.status(200).send({message:ret.data.text})

}