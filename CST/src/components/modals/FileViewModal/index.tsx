import { useCallback, useEffect, useMemo, useState } from 'react';

import { pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

import { downloadFileFromCDN } from '../../../utils/DownloadFromCDN';



import CloseIcon from '@mui/icons-material/Close';
import DownloadIcon from '@mui/icons-material/Download';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
import Slider from '@mui/material/Slider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { PDFView } from '../../views/PDFView';

import { useTheme } from '@mui/material';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;





export const CorrectDocumentViewer = (props: {file : File, zoom: number, setNumPages : (num : number) => void, currentPage : number}) => {

    const { file, setNumPages, currentPage, zoom } = props

    const fileUrl = useMemo(() => {

        return URL.createObjectURL(file)

    }, [file])

    if(file.type === "application/pdf") {

        return (
            <PDFView
                setNumPages={(num) => setNumPages(num)}
                currentPageNum={currentPage}
                file={file}
                zoom={zoom}
            />
        )

    }
    else if(file.type.includes("image/")) {

        return (
            <Stack
                overflow={"auto"}
            >
                <img
                    src={fileUrl}
                    alt="view-of-resume"
                />
            </Stack>
        )

    }

    else if(file.type === "application/msword" || file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {

        return (
            <Stack
                direction={"column"}
                justifyContent={"center"}
            >

                <Typography
                    alignSelf={"center"}
                    textAlign={"center"}
                    variant='h3'
                >

                    Sorry, we support word documents, but they cannot currently be viewed in-house.

                </Typography>

            </Stack>
        )

    }
    


    return (
        <Stack
            direction={"column"}
            justifyContent={"center"}
        >

            <Typography
                alignSelf={"center"}
                textAlign={"center"}
                variant='h3'
            >

                Sorry, this file is not of a supported type.

            </Typography>

        </Stack>
    )

}





export const DocumentViewerModal = (props: { file: File | undefined, open : boolean, onClose : () => void} ) => {

    const { palette } = useTheme()

    const {file, open, onClose} = props

    const [zoomVal, setZoomVal] = useState(0)

	const [numPages, setNumPages] = useState<number>(0);
    
	const [pageNumber, setPageNumber] = useState(1);


    
    useEffect(() => {

        setPageNumber(1)

    }, [file])

    const hasNextPage = useMemo(() => {

        return pageNumber < numPages

    }, [numPages, pageNumber])

    const hasPrevPage = useMemo(() => {

        return pageNumber > 1

    }, [pageNumber])

	const goToPrevPage = useCallback(() => {

        if(hasPrevPage) setPageNumber(prevNum => prevNum - 1)
            
    }, [hasPrevPage])

	const goToNextPage = useCallback(() => {
        
        if(hasNextPage) setPageNumber(prevNum => prevNum + 1)

    }, [hasNextPage])





    



    if(!file) {

        return (
            <Modal
                open={open}
                onClose={onClose}
            >
                <Stack
                    direction={"column"}
                    sx={{
                        position: "absolute",
                        height: "100%",
                        width: "100%",
                        overflow: "clip",
                        border: 'none',
                    }}
                    justifyContent={"center"}
                    alignItems={"center"}
                >
                    <Stack
                        minWidth={"40%"}
                        maxWidth={"55%"}
                        height={"90%"}
                        direction={"column"}
                        p={"2vw"}
                        sx={{
                            borderRadius: 5,
                            backgroundColor: palette.background.paper
                        }}
                    >
                        <IconButton
                            sx={{
                                width: "1vw",
                                aspectRatio: 1
                            }}
                            onMouseDown={() => {
                                onClose()
                            }}
                        >

                            <CloseIcon fontSize='large' />

                        </IconButton>
                        <Stack
                            alignSelf={"center"}
                            flexGrow={1}
                            px={"4vw"}
                            justifyContent={"center"}
                        >
                            <Typography
                                alignSelf={"center"}
                                fontSize={"7vh"}
                            >
                                Hm... this file is undefined!
                            </Typography>  
                        </Stack>
                    </Stack>
                </Stack>
            </Modal>
        )
    }



    return (
        <Modal
            open={open}
            onClose={onClose}
        >
            <Stack
                direction={"column"}
                sx={{
                    position: "absolute",
                    height: "100%",
                    width: "100%",
                    overflow: "clip",
                    border: 'none',
                }}
                justifyContent={"center"}
                alignItems={"center"}
            >
                <Stack
                    width={"66.666%"}
                    height={"90%"}
                    direction={"column"}
                    alignSelf={"center"}
                    p={"1.4vw"}
                    sx={{
                        borderRadius: 5,
                        backgroundColor: palette.background.paper
                    }}
                >

                    <IconButton
                        sx={{
                            alignSelf: "flex-start",
                            mb: "1rem"
                        }}
                        size='small'
                        onMouseDown={() => {
                            onClose()
                        }}
                    >

                        <CloseIcon fontSize='small' />

                    </IconButton>

                    <Stack
                        direction={"row"}
                        gap={"2vw"}
                    >

                        <ButtonGroup
                            variant='text'
                            color='secondary'
                        >
                            <Button
                                sx={{
                                    fontSize: "1vw"
                                }}
                                disabled={!hasPrevPage}
                                onMouseDown={goToPrevPage}
                            >
                                Prev
                            </Button>
                            <Button
                                sx={{
                                    fontSize: "1vw"
                                }}
                                disabled={!hasNextPage}
                                onMouseDown={goToNextPage}
                            >
                                Next
                            </Button>

                        </ButtonGroup>

                        <Typography
                            sx={{
                                fontSize: "1vw"
                            }}
                            alignSelf={"center"}
                            textAlign={"center"}
                        >
                            Page {pageNumber} of {numPages}
                        </Typography>

                        <Stack
                            direction={"row"}
                            flexGrow={1}
                            justifyContent={"flex-end"}
                            px={"1rem"}
                        >

                            <IconButton
                                onMouseDown={() => downloadFileFromCDN(file)}
                            >

                                <DownloadIcon 
                                    sx={{
                                        fontSize: "1.5vw"
                                    }}
                                />

                            </IconButton>

                        </Stack>


                    </Stack>

                    <Stack
                        direction={"column"}
                        alignSelf={"center"}
                        m={"1vh"}
                    >

                        <Typography
                            sx={{
                                alignSelf: "center",
                                fontSize: "1vw"
                            }}
                        >
                            Zoom
                        </Typography>

                        <Slider 
                            value={zoomVal}
                            onChange={(event, value) => setZoomVal(value as number)}
                            min={-100}
                            max={100}
                            defaultValue={0}
                            size="small"
                            sx={{
                                alignSelf: "center",
                                width: "33.333vw"
                            }}
                        />

                    </Stack>



                    <Stack
                        height={"85%"}
                        boxShadow={5}
                        alignSelf={"center"}
                        width={"70%"}
                        overflow={"auto"}
                    >
                        <CorrectDocumentViewer
                            file={file}
                            zoom={zoomVal}
                            setNumPages={(num) => setNumPages(num)}
                            currentPage={pageNumber}
                        />
                    </Stack>


                </Stack>

            </Stack>

        </Modal>

    )
        
}