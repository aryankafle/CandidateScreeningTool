import { Filter } from '../../../utils/Filter';



import DeleteIcon from '@mui/icons-material/Delete';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import { useTheme } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";





type FilterCardProps = {
    
    item : Filter
    index : number,
    isDragging : boolean
    onDelete : (index: number) => void

}





export const FilterLayerCard = (props: FilterCardProps) => {

    const { palette } = useTheme()

    const { isDragging, item, onDelete, index } = props

    if(isDragging) {

        return (
            <Stack
                flexDirection={"row"}
                overflow={"auto"}
                width={"100%"}
                justifyContent={"space-between"}
                alignItems={"center"}
            >
                <Typography
                    sx={{
                        fontSize: "2rem",
                        maxLines: 1,
                        overflow: "hidden"
                    }}
                    whiteSpace={"nowrap"}
                    textOverflow={"ellipsis"}
                    variant="subtitle1"
                    textAlign={"center"}
                >
                    { item.description }
                </Typography>
                <IconButton>
                    <DragHandleIcon
                        sx={{
                            fontSize: "2.2rem"
                        }}
                    />
                </IconButton>
            </Stack>
        )

    }
    
    return (
        <Stack
            flexDirection={"row"}
            width={"100%"}
            justifyContent={"space-between"}
            alignItems={"center"}
        >
            <Typography
                sx={{
                    fontSize: "2rem",
                    maxLines: 1,
                    overflow: "hidden"
                }}
                whiteSpace={"nowrap"}
                textOverflow={"ellipsis"}
                variant="subtitle1"
                textAlign={"center"}
            >
                { item.description }
            </Typography>
            <IconButton
                color="error"
            >
                <DeleteIcon
                    onMouseDown={() => onDelete(index)}
                    sx={{
                        color: palette.text.disabled,
                        fontSize: "2.2rem"
                    }}
                />
            </IconButton>
        </Stack>
    )

}