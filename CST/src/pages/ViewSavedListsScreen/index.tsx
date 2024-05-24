import { useEffect, useCallback, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import UserContext from "../../context/UserContext";
import { SavedListsContext } from "../../context/SavedListsContext";

import { useClipboard } from "../../hooks/Clipboard"

import { SavedList } from "../../utils/SavedList";

import { getUserSavedLists, deleteSavedList } from "../../requests/ResumeRequests";



import { useTheme } from "@mui/material"; 

import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography"
import List from "@mui/material/List";

import { SavedListCard } from "../../components/list-cards/SavedListCard";



const ViewSavedListsScreen = () => {

    const navigate = useNavigate()
    const { palette } = useTheme()

    const [ selectedIndices, setSelectedIndices ] = useState<number[]>([])

    const {savedLists, setSavedLists} = useContext(SavedListsContext)

    const { userData } = useContext(UserContext)

    const { setCurrentSavedList } = useContext(SavedListsContext)

    const [ showDeleteSavedListModal, setShowDeleteSavedListModal ] = useState(false)
    const toggleDeleteFilesConfirmModal = () => setShowDeleteSavedListModal(prevOpen => !prevOpen)

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

    const copyListLink = useCallback(async (savedList : SavedList) => {

        await copyTextToClipboard(`${process.env.REACT_APP_CLIENT_NAME}/results/${savedList.list_link}`, true)

    }, [copyTextToClipboard])

    const sendToList = useCallback(async (list : SavedList) => {

        setCurrentSavedList(list)
        
        navigate("/results")

    }, [navigate, setCurrentSavedList])

    const handleDeleteList = useCallback(async (index : number) => {

        const list = savedLists[index]

        await deleteSavedList(list._id, userData.id)

        setSelectedIndices([])

        const newSavedLists = await getUserSavedLists(userData.id)

        setSavedLists(newSavedLists)

    }, [savedLists, setSavedLists, userData.id])

    const handleRemoveSelection = useCallback(async (index : number) => {

        const lists = selectedIndices.map(index => savedLists[index])

        for(let i = 0; i < lists.length; i++) {
            await deleteSavedList(lists[i]._id, userData.id)
        }

        setSelectedIndices([])

        const newSavedLists = await getUserSavedLists(userData.id)

        setSavedLists(newSavedLists)

    }, [savedLists, selectedIndices, setSavedLists, userData.id])

    const handleToggleSelect = (index : number) => {

        setSelectedIndices(prevIndices => {
            
            if(prevIndices.includes(index)) {

                return prevIndices.filter(someIndex => someIndex !== index)

            }

            return [...prevIndices, index]
            
        })

    }


    const handleKeyDown = useCallback((event : KeyboardEvent) => {
        
        if(event.key === "Delete" && selectedIndices.length > 0) {
            toggleDeleteFilesConfirmModal()
        }

        if(event.key === "Escape") {
            setSelectedIndices([])
        }

        if(event.ctrlKey && event.key === "a") {
            setSelectedIndices(new Array(savedLists.length))
        }

    }, [savedLists.length, selectedIndices.length])

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown)

        return () => {
            window.removeEventListener("keydown", handleKeyDown)
        }

    }, [handleKeyDown])




    
    return (
        <Box
            width={"100%"}
            height={"100%"}  
            p={"2rem"}
        >

            <List
                sx={{
                    minWidth: "10em",
                    width: "60%",
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

                        isSelected={selectedIndices.includes(index)}

                    />
                    { index < savedLists.length-1 && <Divider /> }
                </Box>
                ))}

                { savedLists.length < 1 &&
                <Typography
                    textAlign={"center"}
                    p={"1em"}
                    color={palette.text.disabled}
                >
                    You currently have no saved lists.
                </Typography>
                }

            </List>

        </Box>
    )
}
export default ViewSavedListsScreen