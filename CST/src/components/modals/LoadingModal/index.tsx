
import Modal from "@mui/material/Modal";
import LinearProgress from "@mui/material/LinearProgress";

import { useTheme } from "@mui/material"; 





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