import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography"; 

import { useTheme } from "@mui/material"; 





type ConfirmFilesModalProps = {
    
    open : boolean
    onClose: () => void
    numUploads: number

}



export const ConfirmFilesModal = ({ onClose, open, numUploads } : ConfirmFilesModalProps) => {

    const { palette } = useTheme()

    return (
        <Modal
            open={open}
            aria-labelledby="modal-confirm-files"
            aria-describedby="modal-confirms-file-selection"
            onClose={onClose}
        >
            <Stack
                width={"60vw"}
                height={"70vh"}
                sx={{
                    position: 'absolute' as 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: "50%",
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                    justifyContent: "space-between",
                    overflow: "auto"
                }}
            >

                <Stack>

                    <Typography
                        fontSize={"1.5em"}
                    >
                        Are you sure you want to upload this batch of
                    </Typography>
                    <Typography
                        fontSize={"6em"}
                        fontWeight={"bold"}
                        fontFamily={"monospace"}
                    >
                        {numUploads} 
                    </Typography>
                    <Typography
                        fontSize={"1.5em"}
                    >
                        files?
                    </Typography>

                </Stack>

                <Button
                    variant="contained"
                    sx={{
                        fontSize: "1.5em",
                        alignSelf: "center",
                        px: "2vw",
                        my: "2vh"
                    }}
                    onMouseDown={onClose}
                >
                    Confirm
                </Button>

            </Stack>
        </Modal>
    );
}





type NotEnoughFilesModalProps = {
    
    open : boolean
    onClose: () => void

}



export const NotEnoughFilesModal = ({ onClose, open } : NotEnoughFilesModalProps) => {

    const { palette } = useTheme()

    return (
        <Modal
            open={open}
            aria-labelledby="modal-confirm-files"
            aria-describedby="modal-confirms-file-selection"
            onClose={onClose}
        >
            <Stack
                width={"60vw"}
                height={"70vh"}
                sx={{
                    position: 'absolute' as 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: "50%",
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                    justifyContent: "space-between"
                }}
            >

                <Stack>

                    <Typography
                        fontSize={"1.5em"}
                    >
                        Please upload at least
                    </Typography>
                    <Typography
                        fontSize={"6em"}
                        fontWeight={"bold"}
                        fontFamily={"monospace"}
                    >
                        2
                    </Typography>
                    <Typography
                        fontSize={"1.5em"}
                    >
                        files.
                    </Typography>

                </Stack>

                <Button
                    variant="contained"
                    sx={{
                        fontSize: "1.5em",
                        alignSelf: "center",
                        px: "2vw",
                        my: "2vh"
                    }}
                    onMouseDown={onClose}
                >
                    Okay
                </Button>

            </Stack>
        </Modal>
    );
}





type ConfirmDeleteFilesModalType = {
    
    open : boolean
    onClose: () => void
    numSelected: number

}



export const ConfirmDeleteFilesModal = ({ onClose, open, numSelected } : ConfirmDeleteFilesModalType) => {

    const { palette } = useTheme()

    return (
        <Modal
            open={open}
            aria-labelledby="modal-confirm-files"
            aria-describedby="modal-confirms-file-selection"
            onClose={onClose}
        >
            <Stack
                width={"60vw"}
                height={"70vh"}
                sx={{
                    position: 'absolute' as 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: "50%",
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                    justifyContent: "space-between",
                    overflow: "auto"
                }}
            >

                <Stack>

                    <Typography
                        fontSize={"1.5em"}
                    >
                        Are you sure you want to delete this selection of
                    </Typography>
                    <Typography
                        fontSize={"6em"}
                        fontWeight={"bold"}
                        fontFamily={"monospace"}
                    >
                        {numSelected} 
                    </Typography>
                    <Typography
                        fontSize={"1.5em"}
                    >
                        files?
                    </Typography>

                </Stack>

                <Button
                    variant="contained"
                    sx={{
                        fontSize: "1.5em",
                        alignSelf: "center",
                        px: "2vw",
                        my: "2vh"
                    }}
                    onMouseDown={onClose}
                >
                    Confirm
                </Button>

            </Stack>
        </Modal>
    );
}