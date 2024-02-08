import { ReactNode } from "react";
import NavButton from "../NavButton";
import { useNavigate } from "react-router-dom";
import Button from "../ImprovedButtonComponent";
import { useContext } from "react";
import { SavedList, SavedListsContext } from "../../../context/SavedListsContext";
import { useCallback } from "react";


type SaveListButtonProps = {
    toRoute : string
    className : string
    children : ReactNode
    savedList : SavedList
}


const SaveListButton = (props: SaveListButtonProps)=>{
    const {savedLists, setSavedLists} = useContext(SavedListsContext);

    const addSavedListToSavedLists = useCallback(()=> {
        setSavedLists((savedLists) => {
            if(savedLists.some(sL => SavedList.isEqual(sL, props.savedList))) {
                return savedLists
            }
            return [...savedLists, props.savedList]
        })
    
    }, [savedLists, setSavedLists]) 

    const navigate = useNavigate();
    return (
        <div>
            <Button className={props.className} onClick={() => {
                navigate(props.toRoute)
                addSavedListToSavedLists();
            }}>
                {props.children}
            </Button>
        </div>
    )
}

export default SaveListButton