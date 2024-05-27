import React from 'react';

import { pdfjs, Document, Page } from 'react-pdf'
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';



import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;




export const PDFView = (props: {file: File | undefined, currentPageNum : number, setNumPages: (num : number) => void}) => {

    const { file, setNumPages, currentPageNum } = props



    if(!file) {

        return (
        <Stack
            overflow={"auto"}
        >
            <Typography>
                Hm... this file is undefined!
            </Typography>  
        </Stack>
        )

    }    

    return (
        <Stack
            overflow={"auto"}
        >
            
            <Document
                onPassword={() => {

                    <Typography>
                        Sorry, document is password protected.
                    </Typography>
                    
                }}
                onError={() => (

                    <Typography>
                        Could not load file.
                    </Typography>

                )}
                loading={() => (

                    <Stack
                        direction={"column"}
                        justifyContent={"center"}
                        alignItems={"center"}
                        height={"100%"}
                        width={"100%"}
                    >

                        <CircularProgress
                            size={"large"}
                            sx={{
                                alignSelf: "center"
                            }}
                        />

                    </Stack>

                )}
                file={file}
                onLoadSuccess={(pdf) => setNumPages(pdf.numPages)}
            >

                <Page
                    pageNumber={currentPageNum}
                    loading={() => (

                        <Stack
                            direction={"column"}
                            justifyContent={"center"}
                            alignItems={"center"}
                            height={"100%"}
                            width={"100%"}
                        >

                            <CircularProgress
                                size={"large"}
                                sx={{
                                    alignSelf: "center"
                                }}
                            />

                        </Stack>

                    )}
                />
            
            </Document>

        </Stack>
    )

}