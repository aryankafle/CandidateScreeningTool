import { ReactNode } from "react";
import Button from "../ImprovedButtonComponent";
import NavButton from "../NavButton";
import { SavedList } from "../../../context/SavedListsContext";

type SaveListButtonProps = {
    toRoute : string
    className : string
    children : ReactNode
    savedList : SavedList
}

const SaveListButton = (props: SaveListButtonProps)=>{
    return (
        <div>
            <NavButton className={props.className} toRoute={props.toRoute}>
                Save List
            </NavButton>
        </div>
    )
}

export default SaveListButton