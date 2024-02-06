import {pdfToPng} from 'pdf-to-png-converter'
import { createWorker } from 'tesseract.js';
export const convertPdfToImg = async () => {
    const pngPage = await pdfToPng('../../Half_Day_Schedule.pdf', {
        pagesToProcess: [1],
        viewportScale: 2.0
    });
    return pngPage[0].content
}
export const scantext = async (req, res) => {
    const worker = await createWorker('eng');
            const ret = await worker.recognize(req.message)
            // console.log(ret.data.text);
            // setResponse(ret.data.text)
            await worker.terminate();
            return ret.data.text;
}