import {pdfToPng, PngPageOutput} from 'pdf-to-png-converter'
export const convertPdfToImg = async () => {
    const pngPage = await pdfToPng(halfdayschedule, {
        pagesToProcess: [1],
        viewportScale: 2.0
    });
    return pngPage[0].content
}