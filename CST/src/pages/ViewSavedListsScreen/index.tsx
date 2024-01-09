import React, { FC, InputHTMLAttributes} from "react";
import { Key, useContext, useEffect, useState } from "react";
import Input from '../../components/TextBox'

const ViewSavedListsScreen = () => {
    const [nameInput, setNameInput] = useState("");
    const onChange = (str: string) => {
        setNameInput(str);
    };


    return(
        //<div>
            <form>
                <Input
                    onChange={onChange}
                    name="name"
                    placeholder="Enter your name"
                    value={nameInput}
                    //onkeypress= "handleEnterKey(event)"
                />
            </form>

    )
    
    
}
export default ViewSavedListsScreen