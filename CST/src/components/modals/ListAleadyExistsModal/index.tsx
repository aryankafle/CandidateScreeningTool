import React, { useCallback, useContext } from 'react';

import UserContext from '../../../context/UserContext';



import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Divider from '@mui/material/Divider';
import CircularProgress from '@mui/material/CircularProgress';

import { useTheme } from '@mui/material';

import { SavedList } from '../../../utils/SavedList';
import { deleteSavedList } from '../../../requests/ResumeRequests';





export const ListAlreadyExistsModal = (props: {open : boolean, onClose : ((() => Promise<void>) | (() => void)), listWithSameName : SavedList | undefined, onReplace: () => void}) => {

    const { palette } = useTheme()

    const { userData } = useContext(UserContext)
    
    const { open, onClose, listWithSameName, onReplace } = props
    
    

    const replaceResumeWithSameName = useCallback(async (listWithSameName : SavedList) => {

        await deleteSavedList(listWithSameName._id, userData.id)
        
    }, [userData])




    if(!listWithSameName) {

        return (
        <Modal
            open={open}
            onClose={onClose}
        >

            <CircularProgress />

        </Modal>
        )

    }

    return (
        <Modal
            open={open}
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
                        overflow: "auto"
                    }}
                >
                    <Typography
                        variant="h5"
                    >
                        Oh! A list named:
                    </Typography>
                    <Typography
                        variant="h2"
                    >
                        {`"${listWithSameName.name}"`}
                    </Typography>
                    <Typography
                        variant="h4"
                    >
                        already exists!
                    </Typography>

                    <Divider sx={{
                        mt: "3em",
                        mb: "3em"
                    }} />

                    <Stack
                        alignItems={"center"}
                        alignSelf={"center"}
                        justifyContent={"flex-end"}
                        flexGrow={1}
                        p={"1em"}
                        direction={"column"}
                        sx={{
                            height: "4em",
                            width: "20em"
                        }}
                        gap={"1em"}
                    >

                        <Button
                            size={"large"}
                            variant="contained"
                            onMouseDown={async () => {

                                await replaceResumeWithSameName(listWithSameName)
                                onReplace()

                            }}
                        >

                            <Typography
                                fontSize={"1.6em"}
                            >
                                Replace
                            </Typography>

                        </Button>

                        <Button
                            size={"large"}
                            variant="outlined"
                            onMouseDown={() => onClose()}
                        >

                            <Typography
                                fontSize={"1.6em"}
                            >
                                Go Back
                            </Typography>
                        
                        </Button>

                    </Stack>


                </Stack>

            </Modal>

    )
        
}