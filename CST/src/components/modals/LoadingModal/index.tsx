import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from "@mui/material/IconButton"
import Input from "@mui/material/Input";
import FileOpenOutlined from "@mui/icons-material/FileOpenOutlined"
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner'; 
import TopicIcon from '@mui/icons-material/Topic';
import Stack from "@mui/material/Stack";
import LinearProgress from "@mui/material/LinearProgress";
import { ButtonGroup, ListItemAvatar, ListItemIcon, Typography } from "@mui/material"; 

import { SxProps, Theme, useTheme } from "@mui/material"; 





type LoadingModalProps = {
    
    isLoading : boolean
    loadingPercent : number

}



export const LoadingModal = ({ isLoading, loadingPercent } : LoadingModalProps) => {

    const { palette } = useTheme()

    return (
        <Modal
            open={isLoading}
            aria-labelledby="modal-loading"
            aria-describedby="modal-shows-loading"
            onClose={(event, reason) => {

            }}
        >
            <LinearProgress
                variant="determinate"
                value={loadingPercent*100}
            />
        </Modal>
    );
}