import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography"; 

import { useTheme } from "@mui/material"; 
import { useEffect } from "react";





type ConfirmFilesModalProps = {
    
    open : boolean
    onClose: () => void
    onConfirm: () => void
    numUploads: number

}



export const ConfirmFilesModal = ({ onClose, onConfirm, open, numUploads } : ConfirmFilesModalProps) => {

    const { palette } = useTheme()

    return (
        <Modal
            open={open}
            disableAutoFocus
            aria-labelledby="modal-confirm-files"
            aria-describedby="modal-confirms-file-selection"
            onClose={onClose}
            sx={{
                userSelect: "none"
            }}
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

                <Stack
                    direction={"row"}
                    justifyContent={"center"}
                    gap={"3vw"}
                >
                    
                    <Button
                        variant="contained"
                        sx={{
                            fontSize: "1.5em",
                            alignSelf: "center",
                            px: "2vw",
                            my: "2vh"
                        }}
                        onMouseDown={() => {
                            onConfirm()
                            onClose()
                        }}
                    >
                        Confirm
                    </Button>

                    <Button
                        variant="text"
                        sx={{
                            fontSize: "1.5em",
                            alignSelf: "center",
                            px: "2vw",
                            my: "2vh"
                        }}
                        onMouseDown={onClose}
                    >
                        Cancel
                    </Button>

                </Stack>


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
            aria-labelledby="modal-not-enough-files"
            aria-describedby="modal-alerts-not-enough-files-selection"
            onClose={onClose}
            disableAutoFocus
            sx={{
                userSelect: "none"
            }}
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
    onDelete: () => void
    numSelected: number

}



export const ConfirmDeleteFilesModal = ({ onClose, onDelete, open, numSelected } : ConfirmDeleteFilesModalType) => {

    const { palette } = useTheme()





    return (
        <Modal
            open={open}
            disableAutoFocus
            aria-labelledby="modal-confirm-delete"
            aria-describedby="modal-confirms-delete-selection"
            onClose={onClose}
            sx={{
                userSelect: "none"
            }}
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

                <Stack
                    direction={"row"}
                    justifyContent={"center"}
                    gap={"3vw"}
                >

                    <Button
                        variant="contained"
                        sx={{
                            fontSize: "1.5em",
                            alignSelf: "center",
                            px: "2vw",
                            my: "2vh"
                        }}
                        onMouseDown={() => {
                            onDelete()
                            onClose()
                        }}
                    >
                        Confirm
                    </Button>

                    <Button
                        variant="text"
                        sx={{
                            fontSize: "1.5em",
                            alignSelf: "center",
                            px: "2vw",
                            my: "2vh"
                        }}
                        onMouseDown={onClose}
                    >
                        Cancel
                    </Button>

                </Stack>


            </Stack>
        </Modal>
    );
}