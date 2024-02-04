import { useEffect, useCallback, useContext, useState } from "react";
import Input from '../../components/forms/InputBox'
import { useSelectableList } from "../../hooks/SelectableList";
import { SavedList, SavedListsContext } from "../../context/SavedListsContext";
import { copyOutline } from 'ionicons/icons';
import { IonIcon } from "@ionic/react";





const ViewSavedListsScreen = () => {

    const {savedLists, setSavedLists} = useContext(SavedListsContext)

    const [nameInput, setNameInput] = useState("");

    const {

        selectableItems,

        anySelected,

        selectAll,
        removeCurrentSelectionFromList,
        
        handleSelectionOnKeyDown,
        handleSelectionOnClick

    } = useSelectableList<SavedList>(savedLists, setSavedLists)





    const onChange = (event : React.ChangeEvent<HTMLInputElement>) => {
        if(event.target.value) {
            setNameInput(event.target.value);
        }
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) =>{
        event.preventDefault();
        
        setSavedLists((savedLists) => {
            const dummySavedList = new SavedList(nameInput, "", [])

            if(savedLists.some(savedList => SavedList.isEqual(savedList, dummySavedList))) {
                return savedLists
            }

            return [...savedLists, dummySavedList]
        })
    }

    const handleRemoveSelection = () => {
        let confirmation = window.confirm("Are you sure you want to delete the selected saved lists?")

        if(confirmation) {
            removeCurrentSelectionFromList()
        }
    }

    const createCombinedList = () => {
        let name = prompt("Name of Combined List") || undefined
        let description = prompt("Description of Combined List") || undefined

        const newList = SavedList.combine(selectableItems.filter((selectable) => selectable.isSelected).map(selectable => selectable.item), name, description)
        setSavedLists((savedLists) => {
            if(savedLists.some(savedList => SavedList.isEqual(savedList, newList))) {
                return savedLists
            }

            return [...savedLists, newList]
        })
    }

    

    function sendToList(list : SavedList) {
        alert(`Sending to List: ${list.listName}\nwith description: ${list.listDescription}\nand color: ${list.color}`)
    }



    const handleKeyDown = useCallback((event : KeyboardEvent) => {
        if(event.key === "Delete") {
            handleRemoveSelection()
        }
        handleSelectionOnKeyDown(event)
    }, [handleSelectionOnKeyDown])

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown)

        return () => {
            window.removeEventListener("keydown", handleKeyDown)
        }

    }, [handleKeyDown])




    
    const SavedListCard =  (props: {savedList : SavedList, index: number}) => {
        return (
            <div className="border-black text-black
                            dark:border-white dark:text-white
                            flex flex-row border-[0.1rem] px-[2rem] justify-between">
                <div 
                    className={
                            selectableItems[props.index].isSelected ?
                                `text-red border-red
                                dark:text-red
                                select-none cursor-pointer overflow-x-clip text-ellipsis w-[70%]`
                            :
                                `text-black border-black
                                dark:text-white
                                select-none cursor-pointer overflow-x-clip text-ellipsis w-[70%]`
                        }
                        onClick={(event) => { handleSelectionOnClick(event, props.index) }}
                >
                    {props.savedList.listName}
                </div>
                <div
                    className="cursor-pointer select-none w-[10%]"
                    onClick={() => { sendToList(props.savedList) }}
                >
                    Open List
                </div>
            </div>
        )
    }
      


    return(
       <div className=" dark:bg-blue bg-white justify-center
                        flex flex-grow flex-col pb-[10rem]">
            <div className="text-black dark:text-white flex flex-row pt-[1rem] justify-center">
                <Input
                    onChange={onChange}
                    onSubmit={handleSubmit}
                    title="Enter External List"
                    placeholder="Enter Link"    
                />
                <IonIcon className="cursor-pointer text-[2rem] pt-8 px-4" icon={copyOutline}></IonIcon>
            </div>
            <div className="flex flex-grow flex-col min-h-[20rem] h-[0] mt-[1.5rem] overflow-auto">
                <ol className=" border-black self-center flex-grow
                                dark:border-white
                                border-[0.1rem] overflow-y-auto min-w-[35rem] w-[60vw]">
                        {selectableItems.map(
                            (selectable, index : number) => (
                                <SavedListCard
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
                            text-center">
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