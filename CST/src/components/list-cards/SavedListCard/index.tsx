import { useCallback } from 'react';

import { useClipboard } from '../../../hooks/Clipboard';

import { SavedList } from '../../../utils/SavedList';



import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from "@mui/material/IconButton"
import TopicIcon from '@mui/icons-material/Topic';
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography"; 
import Checkbox from '@mui/material/Checkbox';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

import { useTheme } from "@mui/material"; 





type SavedListCardProps = {
    
    list : SavedList

    index: number
    isSelected: boolean
    onSelect: (index : number) => void
    onDelete: (index : number) => void

}





export const SavedListCard = ({ list, index, isSelected, onSelect, onDelete } : SavedListCardProps) => {

    const { palette } = useTheme()

    const {

        copyTextToClipboard

    } = useClipboard()

    const labelId = `checkbox-list-label-${index}`





    const copyListLink = useCallback(async (savedList : SavedList) => {

        await copyTextToClipboard(`${process.env.REACT_APP_CLIENT_NAME}/results/${savedList.list_link}`, true)

    }, [copyTextToClipboard])





    return (
        <ListItem
            key={index}
            sx={{
                width: "100%",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "1vw",
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
                    alignItems={"center"}
                    gap={"0.3vw"}
                >

                    <TopicIcon
                        sx={{
                            fontSize: "1.7rem",
                            color: palette.text.disabled
                        }}
                    />

                    <Typography
                        fontSize={"1.5rem"}
                        overflow={"clip"}
                        textOverflow={"ellipsis"}
                        sx={{
                            maxWidth: "80%",
                            display: "block",
                            maxLines: 1,
                            whiteSpace: "nowrap",
                            userSelect: "none",
                        }}
                    >
                        {list.name}
                    </Typography>

                </Stack>
                
            </ListItemButton>

            <IconButton
                aria-label="delete"
                color={"error"}
                onMouseDown={() => copyListLink(list)}
            >
                <ContentCopyIcon
                    sx={{
                        fontSize: "1.7rem",
                        color: palette.text.secondary
                    }}
                />
            </IconButton>

            <IconButton
                aria-label="delete"
                color={"error"}
                onMouseDown={() => onDelete(index)}
            >
                <DeleteIcon
                    sx={{
                        fontSize: "1.7rem",
                        color: palette.text.secondary
                    }}
                />
            </IconButton>
            
        </ListItem>
    );
}