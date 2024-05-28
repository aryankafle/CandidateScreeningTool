import { useEffect, useCallback, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import UserContext from "../../context/UserContext";
import { SavedListsContext } from "../../context/SavedListsContext";

import { useClipboard } from "../../hooks/Clipboard"

import { SavedList } from "../../utils/SavedList";

import { getUserSavedLists, deleteSavedList } from "../../requests/ResumeRequests";



import { Button, Stack, useTheme } from "@mui/material"; 

import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography"
import List from "@mui/material/List";

import { SavedListCard } from "../../components/list-cards/SavedListCard";
import { useMouse } from "@uidotdev/usehooks";
import FlagContext from "../../context/FlagContext";



const ViewSavedListsScreen = () => {
    
    const navigate = useNavigate()

    const [mouse, ref] = useMouse()

    const { palette } = useTheme()

    const [ selectedIndex, setSelectedIndex ] = useState<number>(-1)

    const {savedLists, setSavedLists} = useContext(SavedListsContext)

    const { userData } = useContext(UserContext)

    const { updateFlag, clearFlags } = useContext(FlagContext)

    const { setCurrentSavedList } = useContext(SavedListsContext)

    const {

        copyTextToClipboard

    } = useClipboard()





    useEffect(() => {

        getUserSavedLists(userData.id)
        .then((data) => {

            setSavedLists(data)

        })
        .catch((error) => {

            console.log("Saved List Error: ", error)

        })

    }, [setSavedLists, userData.id])

    useEffect(() => {

        setCurrentSavedList(undefined)

    }, [])

    const copyListLink = useCallback(async (savedList : SavedList) => {

        await copyTextToClipboard(`${process.env.REACT_APP_CLIENT_NAME}/results/${savedList.list_link}`, true)

    }, [copyTextToClipboard])

    const sendToList = useCallback(async (list : SavedList) => {

        updateFlag({flag: "filters have changed", action: "activate"})

        setCurrentSavedList(list)
        
        navigate("/results")

    }, [navigate, setCurrentSavedList, updateFlag])

    const handleDeleteList = useCallback(async (index : number) => {

        const list = savedLists[index]

        await deleteSavedList(list._id, userData.id)

        setSelectedIndex(-1)

        const newSavedLists = await getUserSavedLists(userData.id)

        setSavedLists(newSavedLists)

    }, [savedLists, setSavedLists, userData.id])

    const handleToggleSelect = (index : number) => {

        setSelectedIndex(prevIndex => {
            
            if(prevIndex === index) {

                return -1

            }

            return index
            
        })

    }


    const handleKeyDown = useCallback((event : KeyboardEvent) => {
        
        if(event.key === "Delete" && selectedIndex > -1) {
            
        }

        if(event.key === "Escape") {

            setSelectedIndex(-1)
        
        }

    }, [selectedIndex])

    useEffect(() => {
        
        window.addEventListener("keydown", handleKeyDown)

        return () => {
            window.removeEventListener("keydown", handleKeyDown)
        }

    }, [handleKeyDown])




    
    return (
        <Stack
            width={"100%"}
            height={"100%"}  
            p={"2rem"}
            sx={{
                userSelect: "none"
            }}
            direction={"row"}
        >
            
            <List
                sx={{
                    minWidth: "rem",
                    width: "55%",
                    height: "100%",
                    border: 1,
                    borderColor: palette.divider,
                    borderRadius: 5,
                    direction: "column",
                    overflow: "auto"
                }}
            >

                {savedLists.map((list, index) => (
                <Box
                    key={index + Math.random()*99999}
                >
                    <SavedListCard

                        list={list}

                        index={index}
                        
                        onSelect={(index) => handleToggleSelect(index)}
                        onDelete={(index) => handleDeleteList(index)}

                        isSelected={selectedIndex === index}

                    />
                    { index < savedLists.length-1 && <Divider /> }
                </Box>
                ))}

                { savedLists.length < 1 &&
                <Typography
                    textAlign={"center"}
                    p={"rem"}
                    color={palette.text.disabled}
                >
                    You currently have no saved lists.
                </Typography>
                }

            </List>
            
            {   selectedIndex < 0 &&

            <Stack
                flexGrow={1}
                p={"2rem"}
                whiteSpace={"nowrap"}
                maxWidth={"45%"}
                textOverflow={"ellipsis"}
            >
                <Typography
                    fontSize={"1.rem"}
                >
                    Here are your
                </Typography>
                <Box
                    ref={ref}
                >
                    <Typography
                        whiteSpace={"wrap"}
                        textOverflow={"ellipsis"}
                        display={"block"}
                        overflow={"hidden"}
                        fontSize={"rem"}
                        sx={{
                            cursor: "default",
                            userSelect: "none",
                            backgroundImage: `radial-gradient(circle at ${mouse.elementX}px ${mouse.elementY}px, ${palette.secondary.light}, ${palette.secondary.main})`,
                            backgroundSize: "100%",
                            backgroundRepeat: "repeat",
                            backgroundClip: "text",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent"
                        }}
                    >
                        Saved Lists.
                    </Typography>
                </Box>

            </Stack>

            }

            {   selectedIndex > -1 &&
                <Stack
                    flexGrow={1}
                    p={"2rem"}
                    whiteSpace={"nowrap"}
                    maxWidth={"45%"}
                    textOverflow={"ellipsis"}
                >

                    <Box
                        ref={ref}
                    >
                        <Typography
                            textAlign={"center"}
                            fontSize={"rem"}
                            whiteSpace={"no-wrap"}
                            textOverflow={"ellipsis"}
                            display={"block"}
                            overflow={"hidden"}
                            sx={{
                                cursor: "default",
                                userSelect: "none",
                                backgroundImage: `radial-gradient(circle at ${mouse.elementX}px ${mouse.elementY}px, ${savedLists[selectedIndex].color}, ${palette.getContrastText(savedLists[selectedIndex].color)})`,
                                backgroundSize: "100%",
                                backgroundRepeat: "repeat",
                                backgroundClip: "text",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent"
                            }}
                        >
                            {savedLists[selectedIndex].name}
                        </Typography>
                    </Box>

                    <Typography
                        whiteSpace={"wrap"}
                        textOverflow={"ellipsis"}
                        display={"block"}
                        overflow={"hidden"}
                        mb={"rem"}
                    >
                        {savedLists[selectedIndex].description}
                    </Typography>

                    <Button
                        variant="contained"
                        fullWidth
                        onMouseDown={() => {

                            sendToList(savedLists[selectedIndex])

                        }}
                    >

                        <Typography
                            variant="h5"
                        >
                            Open List
                        </Typography>
                    </Button>
                </Stack>

            }


        </Stack>
    )
}
export default ViewSavedListsScreen