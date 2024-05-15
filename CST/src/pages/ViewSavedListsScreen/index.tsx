import { useEffect, useCallback, useContext, useState } from "react";
import Input from '../../components/forms/InputBox'
import { useSelectableList } from "../../hooks/SelectableList";
import { useClipboard } from "../../hooks/Clipboard"
import { SavedListsContext } from "../../context/SavedListsContext";

import { copyOutline } from 'ionicons/icons';
import { IonIcon } from "@ionic/react";
import { useNavigate } from "react-router-dom";
import { SavedList } from "../../utils/SavedList";
import { getUserSavedLists, deleteSavedList } from "../../requests/ResumeRequests";
import UserContext from "../../context/UserContext";





const ViewSavedListsScreen = () => {

    const navigate = useNavigate()

    const {savedLists, setSavedLists} = useContext(SavedListsContext)

    const { userData } = useContext(UserContext)

    const { setCurrentSavedList } = useContext(SavedListsContext)

    const [nameInput, setNameInput] = useState<string>("");

    const {

        selectableItems,

        anySelected,

        getAllSelectedItems,

        selectAll,
        removeCurrentSelectionFromList,
        
        handleSelectionOnKeyDown,
        handleSelectionOnClick

    } = useSelectableList<SavedList>(savedLists, setSavedLists)

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





    const handleRemoveSelection = useCallback(async () => {
        let confirmation = window.confirm("Are you sure you want to delete the selected saved lists?")

        if(confirmation) {
            
            const lists = getAllSelectedItems()

            for(let i = 0; i < lists.length; i++) {
                await deleteSavedList(lists[i]._id, userData.id)
            }

            removeCurrentSelectionFromList()

            const savedLists = await getUserSavedLists(userData.id)

            setSavedLists(savedLists)

        }
        
    }, [getAllSelectedItems, removeCurrentSelectionFromList, setSavedLists, userData.id])



    const createCombinedList = useCallback(() => {
        
        // const selected = getAllSelectedItems()

        // if(getAllSelectedItems().length !== 2) return;

        // const firstList = selected[0]
        // const secondList = selected[1]

        // const combined = SavedList.combine(firstList, secondList)

        // setSavedLists((savedLists) => {

        //     if(savedLists.some(savedList => savedList.name === combined.name)) {
        //         return savedLists
        //     }

        //     return [...savedLists, combined]

        // })

    }, [setSavedLists, getAllSelectedItems])

    const copyListLink = useCallback(async (savedList : SavedList) => {

        await copyTextToClipboard(savedList.list_link, true)

    }, [copyTextToClipboard])

    const sendToList = useCallback((list : SavedList) => {

        setCurrentSavedList(list)
        navigate("/results")

    }, [navigate, setCurrentSavedList])

    const addExternalListToSavedLists = useCallback(() => {  

        if(!nameInput) return;

        //do somehting with external list here
        
    }, [nameInput])



    const handleKeyDown = useCallback((event : KeyboardEvent) => {
        if(event.key === "Delete") {
            handleRemoveSelection()
        }
        handleSelectionOnKeyDown(event)
    }, [handleRemoveSelection, handleSelectionOnKeyDown])

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown)

        return () => {
            window.removeEventListener("keydown", handleKeyDown)
        }

    }, [handleKeyDown])




    
    const SavedListCard =  (props: {savedList : SavedList, index: number}) => {
        return (
            <div className="text-black hover:bg-black/25
                            dark:text-white flex flex-row 
                            px-[3rem] py-[3rem] text-xl border-b-2 last:border-none"
                            onClick={(event) => { handleSelectionOnClick(event, props.index) }}>
                <div 
                    className={
                            selectableItems[props.index].isSelected ?
                                `text-black
                                dark:text-white underline font-bold
                                flex-grow select-none cursor-pointer`
                            :
                                `text-black
                                dark:text-white no-underline font-normal
                                flex-grow select-none cursor-pointer`
                        }
                        // onClick={(event) => { handleSelectionOnClick(event, props.index) }}
                >
                    {props.savedList.name}
                </div>
                <div className="flex flex-row justify-between w-[10rem]">
                    <div
                        className="flex flex-grow w-[6rem] cursor-pointer select-none text-[1.2rem]"
                        onClick={() => { sendToList(props.savedList) }}
                    >
                        <span className="text-center self-center">
                            Open List
                        </span>
                    </div>
                    <div
                        className="flex flex-row flex-grow cursor-pointer"
                        onClick={() => {copyListLink(props.savedList)}}
                    >
                        <IonIcon className="h-full w-full" icon={copyOutline}></IonIcon>
                    </div>
                </div>
            </div>
        )
    }
      


    return(
       <div className=" dark:bg-grayDark bg-white justify-center
                        flex flex-grow flex-col pb-[10rem]">
            <div className="text-black dark:text-white flex flex-row pt-[3rem] justify-center p-10">
                <Input
                    title={"Enter External List"} placeholder={"Enter Link"}
                    value={nameInput}
                    onSubmit={(event) => { addExternalListToSavedLists(); setNameInput("")}}
                    onChange={(event) => { setNameInput(event.target.value) }}
                    errorFunction={(string) => {return ""}}
                />
            </div>
            <div className="flex flex-grow flex-col min-h-[20rem] h-[0] mt-[1.5rem] overflow-auto">
                <ol className=" self-center flex-grow overflow-y-auto min-w-[35rem] w-[60vw]">
                        {selectableItems.map(
                            (selectable, index : number) => (
                                <SavedListCard
                                    key = {selectable.id}
                                    index = {index}
                                    savedList = {selectable.item}
                                />
                            ))}
                </ol>
            </div>
            <div className="pt-[2rem] h-[5rem]
                            text-black
                            dark:text-white
                            self-center
                            text-center
                            text-xl">
                {
                    anySelected() ?
                        <div className="flex flex-col gap-[0.5rem]">
                            <div
                                className="select-none cursor-pointer"
                                onClick={() => { handleRemoveSelection() }}
                            >
                                Delete Current Selection
                            </div>
                            <div
                                className="select-none cursor-pointer"
                                onClick={() => { createCombinedList() }}
                            >
                                Create Combined List from Selection
                            </div>
                        </div>
                    :
                        savedLists.length > 0 &&
                        <div
                            className="select-none cursor-pointer"
                            onClick={() => { selectAll() }}
                        >
                            Select All
                        </div>
                }
            </div>
        </div>

    )
}
export default ViewSavedListsScreen