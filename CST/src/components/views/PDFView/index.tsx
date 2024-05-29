import React, { useMemo } from 'react';

import { pdfjs, Document, Page } from 'react-pdf'
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';



import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;




export const PDFView = (props: {file: File | undefined, zoom: number, currentPageNum : number, setNumPages: (num : number) => void}) => {

    const { file, setNumPages, currentPageNum, zoom } = props

    const zoomFactor = useMemo(() => {

        return 1 + zoom / 100
        
    }, [zoom])



    if(!file) {

        return (
        <Stack
            overflow={"auto"}
            flexGrow={1}
            direction={"column"}
            alignItems={"center"}
        >
            <Stack
                direction={"column"}
                overflow={"auto"}
                flexGrow={1}
            >
                <Typography
                    p={"1vw"}
                    alignItems={"center"}
                    textAlign={"center"}
                    fontSize={"2vw"}
                >
                    Sorry, this file can't be parsed.
                </Typography>

            </Stack>

        </Stack>
        )

    }



    return (
        <Stack
            direction={"column"}
        >
            <Stack
                direction={"column"}
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
                    noData={() => (

                        <Typography>
                            No data.
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
                        noData={() => (

                            <Typography>
                                No data.
                            </Typography>
        
                        )}
                        height={1000 * zoomFactor}
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

        </Stack>
    )

}