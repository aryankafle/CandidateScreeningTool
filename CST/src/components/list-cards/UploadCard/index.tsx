import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from "@mui/material/IconButton"
import TopicIcon from '@mui/icons-material/Topic';
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography"; 
import Checkbox from '@mui/material/Checkbox';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';

import { SxProps, Theme, useTheme } from "@mui/material"; 





type FileUploadButtonProps = {
    
    file : File
    sx?: SxProps<Theme>

    index: number
    isSelected: boolean
    onSelect: (index : number) => void
    onDelete: (index : number) => void

}





export const UploadCard = ({ sx, file, index, isSelected, onSelect, onDelete } : FileUploadButtonProps) => {

    const { palette } = useTheme()

    const labelId = `checkbox-list-label-${index}`

    return (
        <ListItem
            key={index}
            secondaryAction={
                <IconButton
                    aria-label="delete"
                    color={"error"}
                    onMouseDown={() => onDelete(index)}
                >
                    <DeleteIcon
                        sx={{
                            color: palette.text.disabled
                        }}
                        fontSize='medium'
                    />
                </IconButton>
            }
            sx={{
                justifyContent: "space-between",
                alignItems: "center",
                padding: "0.222em",
                backgroundColor: palette.background.paper,
            }}
        >
            <ListItemButton
                role={undefined}
                onMouseDown={() => onSelect(index)}
            >

                <ListItemIcon>
                    <Checkbox
                        checked={isSelected}
                        tabIndex={-1}
                        disableRipple
                        inputProps={{ 'aria-labelledby': labelId }}
                    />
                </ListItemIcon>

                <Stack
                    direction={"row"}
                    width={"55%"}
                    alignItems={"center"}
                    gap={"1em"}
                >

                    <TopicIcon
                        fontSize='medium'
                        sx={{
                            color: palette.text.disabled
                        }}
                    />

                    <Typography
                        variant='subtitle1'
                        textOverflow={"ellipsis"}
                        sx={{
                            width: "100%",
                            maxWidth: "100%",
                            display: "block",
                            "overflow": "clip",
                            maxLines: 1,
                            whiteSpace: "nowrap",
                            userSelect: "none",
                        }}
                    >
                        {file.name}
                    </Typography>

                </Stack>
                
            </ListItemButton>
        </ListItem>
    );
}