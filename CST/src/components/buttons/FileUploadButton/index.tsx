import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import FormLabel from "@mui/material/FormLabel";
import Typography from "@mui/material/Typography";
import Icon from "@mui/material/Icon";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

import { useTheme } from "@mui/material"; 





type FileUploadButtonProps = {
    onUpload : React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
}





export const FileUploadButton = ({ onUpload } : FileUploadButtonProps) => {

    const { palette } = useTheme()

    return (
        <>
            <Input
                name="custom-file-input"
                id="custom-file-input"
                type="file"
                hidden
                style={{ display: "none" }}
                inputProps={{
                    multiple: true,
                    accept: ".pdf, .png, .jpg, .jpeg, .doc, .docx"
                }}
                onChange={onUpload} />
            <FormLabel
                htmlFor="custom-file-input"
                sx={{
                    width: "100%",
                }}
            >
                <Button
                    fullWidth
                    variant="outlined"
                    component="span"
                >

                    <CloudUploadIcon
                        sx={{
                            alignSelf: "center",
                            fontSize: "1.7vw",
                            mr: "1vw"
                        }}
                    />

                    <Typography
                        sx={{
                            fontSize: "1.5vw",
                            textAlign: "center"
                        }}
                    >
                        Upload Resumes
                    </Typography>
                </Button>
            </FormLabel>
        </>
    );
}