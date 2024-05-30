import { pdfToPng } from "pdf-to-png-converter";





export const streamToBuffer = (stream) => {

    return new Promise((resolve, reject) => {
    
        const chunks = [];

        stream.on('data', (chunk) => chunks.push(chunk));
        stream.on('end', () => resolve(Buffer.concat(chunks)));
        stream.on('error', (err) => reject(err));

    });
    
};



export const convertPdfStreamToPngBuffers = async (pdfReadStream) => {

    const pdfBuffer = await streamToBuffer(pdfReadStream);

    const pngPages = await pdfToPng(pdfBuffer, {
        viewportScale: 2.0,
    });

    return pngPages.map(page => page.content)

};



export async function turnPdfToPngs(pdfBuffer) {

    const pngPages = await pdfToPng(pdfBuffer, {
        viewportScale: 2.0,
    });

    return pngPages.map(page => page.content)

}