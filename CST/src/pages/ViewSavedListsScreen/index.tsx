import { useEffect, useCallback, useContext, useState } from "react";
import Input from '../../components/forms/InputBox'
import { useSelectableList } from "../../hooks/SelectableList";
import { useClipboard } from "../../hooks/Clipboard"
import { SavedListsContext } from "../../context/SavedListsContext";
import { SelectionContext } from "../../context/SelectionContext";

import { copyOutline } from 'ionicons/icons';
import { IonIcon } from "@ionic/react";
import { useNavigate } from "react-router-dom";
import { SavedList } from "../../utils/SavedList";





const ViewSavedListsScreen = () => {

    const navigate = useNavigate()

    const {savedLists, setSavedLists} = useContext(SavedListsContext)

    const { setCurrentSavedList } = useContext(SelectionContext)

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





    const handleRemoveSelection = useCallback(() => {
        let confirmation = window.confirm("Are you sure you want to delete the selected saved lists?")

        if(confirmation) {
            removeCurrentSelectionFromList()
        }
    }, [removeCurrentSelectionFromList])



    const createCombinedList = useCallback(() => {
        
        const selected = getAllSelectedItems()

        if(getAllSelectedItems().length !== 2) return;

        const firstList = selected[1]
        const secondList = selected[2]

        const combined = SavedList.combine(firstList, secondList)

        setSavedLists((savedLists) => {

            if(savedLists.some(savedList => savedList.name === combined.name)) {
                return savedLists
            }

            return [...savedLists, combined]

        })

    }, [setSavedLists, getAllSelectedItems])

    const copyListLink = useCallback(async (savedList : SavedList) => {

        await copyTextToClipboard(savedList.listLink, true)

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
            <div className="border-black text-black hover:bg-blueMid
                            dark:border-white dark:text-white
                            flex flex-row border-[0.1rem] px-[2rem] 
                            py-[1rem] justify-between text-xl">
                <div 
                    className={
                            selectableItems[props.index].isSelected ?
                                `text-red border-red
                                dark:text-red
                                flex flex-grow select-none cursor-pointer overflow-x-clip text-ellipsis`
                            :
                                `text-black border-black
                                dark:text-white
                                flex flex-grow select-none cursor-pointer overflow-x-clip text-ellipsis`
                        }
                        onClick={(event) => { handleSelectionOnClick(event, props.index) }}
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
       <div className=" dark:bg-blueDark bg-white justify-center
                        flex flex-grow flex-col pb-[10rem]">
            <div className="text-black dark:text-white flex flex-row pt-[1rem] justify-center p-10">
                <Input
                    title={"Enter External List"} placeholder={"Enter Link"}
                    value={nameInput}
                    onSubmit={(event) => { addExternalListToSavedLists(); setNameInput("")}}
                    onChange={(event) => { setNameInput(event.target.value) }}
                    errorFunction={(string) => {return ""}}
                />
            </div>
            <div className="flex flex-grow flex-col min-h-[20rem] h-[0] mt-[1.5rem] overflow-auto">
                <ol className=" border-black self-center flex-grow
                                dark:border-white
                                border-[0.1rem] overflow-y-auto min-w-[35rem] w-[60vw]">
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