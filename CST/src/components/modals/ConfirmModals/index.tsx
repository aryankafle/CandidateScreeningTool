import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { useTheme } from "@mui/material";





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
                    py: "4vh",
                    justifyContent: "space-between",
                    overflow: "auto"
                }}
            >

                <Stack
                    px={"3vw"}
                    alignSelf={"center"}
                >
                    <Stack
                        direction={"row"}
                    >

                        <Typography
                            fontSize={"2vw"}
                        >
                            Are you sure you want to
                        </Typography>
                        <Typography
                            fontSize={"2vw"}
                        >
                            &nbsp;
                        </Typography>
                        <Typography
                            color={palette.primary.main}
                            fontWeight={"bold"}
                            fontSize={"2vw"}
                        >
                            upload
                        </Typography>

                    </Stack>

                    <Typography
                        fontSize={"5vw"}
                        fontFamily={"monospace"}
                        alignSelf={"center"}
                        textAlign={"center"}
                    >
                        {numUploads} files?
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
                            fontSize: "1.7vw",
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
                            fontSize: "1.7vw",
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
                direction={"column"}
                sx={{
                    position: 'absolute' as 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: "50%",
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    py: "4vh",
                    justifyContent: "center",
                    gap: "8vh",
                    overflow: "auto"
                }}
            >

                <Stack>

                    <Typography
                        fontSize={"2vw"}
                        alignSelf={"center"}
                        textAlign={"center"}
                    >
                        Please upload at least
                    </Typography>
                    <Typography
                        fontSize={"5vw"}
                        fontFamily={"monospace"}
                        alignSelf={"center"}
                        textAlign={"center"}
                    >
                        2 files
                    </Typography>

                </Stack>

                    <Button
                        variant="text"
                        sx={{
                            fontSize: "3vw",
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
                    py: "4vh",
                    justifyContent: "space-between",
                    overflow: "auto"
                }}
            >

                <Stack
                    px={"3vw"}
                    alignSelf={"center"}
                >
                    <Stack
                        direction={"row"}
                    >

                        <Typography
                            fontSize={"2vw"}
                        >
                            Are you sure you want to
                        </Typography>
                        <Typography
                            fontSize={"2vw"}
                        >
                            &nbsp;
                        </Typography>
                        <Typography
                            color={"error"}
                            fontWeight={"bold"}
                            fontSize={"2vw"}
                        >
                            delete
                        </Typography>

                    </Stack>

                    <Typography
                        fontSize={"5vw"}
                        fontFamily={"monospace"}
                        alignSelf={"center"}
                        textAlign={"center"}
                    >
                        {numSelected} files?
                    </Typography>

                </Stack>

                <Stack
                    direction={"row"}
                    justifyContent={"center"}
                    gap={"3vw"}
                >
                    
                    <Button
                        variant="contained"
                        color="error"
                        sx={{
                            fontSize: "1.7vw",
                            alignSelf: "center",
                            px: "2vw",
                            my: "2vh"
                        }}
                        onMouseDown={() => {
                            onDelete()
                            onClose()
                        }}
                    >
                        Delete
                    </Button>

                    <Button
                        variant="text"
                        sx={{
                            fontSize: "1.7vw",
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